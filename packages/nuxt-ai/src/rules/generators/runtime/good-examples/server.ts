// Server runtime handler
export default defineEventHandler(async (event) => {
  // Access runtime config in server
  const config = useRuntimeConfig()

  // Initialize services with private keys
  const stripe = new Stripe(config.stripe.secretKey, {
    apiVersion: '2023-10-16',
  })

  // Handle webhook events
  const signature = getHeader(event, 'stripe-signature')
  const rawBody = await readBody(event)

  try {
    const webhookEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      config.stripe.webhookSecret,
    )

    // Process webhook
    switch (webhookEvent.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(webhookEvent.data.object)
        break
      case 'payment_intent.failed':
        await handlePaymentFailure(webhookEvent.data.object)
        break
      default:
        console.log(`Unhandled event type ${webhookEvent.type}`)
    }

    return { received: true }
  }
  catch (err) {
    throw createError({
      statusCode: 400,
      message: `Webhook Error: ${err.message}`,
    })
  }
})
