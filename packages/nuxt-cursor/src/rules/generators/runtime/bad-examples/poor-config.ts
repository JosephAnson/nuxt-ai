// ❌ Wrong: Hardcoding sensitive information
const STRIPE_SECRET_KEY = 'sk_test_123456789'
const API_SECRET = 'my_super_secret_key'

// ❌ Wrong: Not using runtime config
export default {
  // ❌ Wrong: Exposing secrets in client-side code
  stripeConfig: {
    secretKey: STRIPE_SECRET_KEY,
    publishableKey: 'pk_test_987654321',
  },

  // ❌ Wrong: Not using environment variables
  api: {
    baseUrl: 'http://localhost:3000',
    secret: API_SECRET,
  },
}

// ❌ Wrong: Global state for configuration
if (process.client) {
  window.__APP_CONFIG__ = {
    // ❌ Wrong: Mixing client/server concerns
    apiSecret: API_SECRET,
    stripeKey: STRIPE_SECRET_KEY,
  }
}

// ❌ Wrong: Not using proper typing
export function getConfig() {
  // ❌ Wrong: Accessing window directly
  return process.client
    ? window.__APP_CONFIG__
    : {
        apiSecret: API_SECRET,
        stripeKey: STRIPE_SECRET_KEY,
      }
}
