// ❌ WRONG: Not using H3 utilities
// This example shows incorrect usage of Node.js req/res objects

import { defineEventHandler } from 'h3'
import type { H3Event } from 'h3'

// Wrong: Using raw Node.js types instead of H3
export default defineEventHandler(async (event: H3Event) => {
  try {
    // Wrong: Accessing raw request properties
    const id = event.context.params?.id

    // Wrong: Manual JSON parsing
    let body = ''
    event.req.on('data', (chunk) => {
      body += chunk.toString()
    })

    // Wrong: Manual response handling
    const data = JSON.parse(body)
    event.res.writeHead(200, { 'Content-Type': 'application/json' })
    event.res.end(JSON.stringify({ id, data }))
  }
  catch (error) {
    // Wrong: Manual error handling
    event.res.writeHead(500)
    event.res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}
