import { createOpenAI } from '@ai-sdk/openai'

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey

  if (!apiKey)
    throw new Error('Missing OpenAI API key')

  const openai = createOpenAI({
    apiKey,
  })

  return defineEventHandler(async (event: any) => {
    const { messages } = await readBody(event)

    const result = streamText({
      model: openai('o1-mini'),
      messages,
    })

    return result.toDataStreamResponse()
  })
})
