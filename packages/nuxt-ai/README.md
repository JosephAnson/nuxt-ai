# @josephanson/nuxt-ai

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A Nuxt module for adding AI capabilities to your Nuxt app.

## Documentation

- [Nuxt AI](https://nuxt-ai.josephanson.com)

## Features

- [x] Generate Nuxt rules from examples for different clients
- [x] Generate MCP server to help with developer experience
- [ ] Generate MCP server to help with managing documentation
- [x] Implement auto imported ai helpers to add ai to nuxt applications

## Quick Setup

1. Add `@josephanson/nuxt-ai` dependency to your project

```bash
# Using pnpm
pnpm add -D @josephanson/nuxt-ai

# Using yarn
yarn add --dev @josephanson/nuxt-ai

# Using npm
npm install --save-dev @josephanson/nuxt-ai
```

2. Add `nuxt-ai` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@josephanson/nuxt-ai'],
})
```

That's it! You can now use nuxt-ai in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

## Credits

Big thanks to the following projects that made this possible and inspired this project:

- [Nuxt Vite MCP](https://github.com/antfu/nuxt-mcp)
- [Nuxt AI SDK](https://sdk.vercel.ai/)
- [MCP Docs Service](https://github.com/alekspetrov/mcp-docs-service)

## License

[MIT](./LICENSE) License © [Joseph Anson](https://github.com/josephanson)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@josephanson/nuxt-ai?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@josephanson/nuxt-ai
[npm-downloads-src]: https://img.shields.io/npm/dm/@josephanson/nuxt-ai?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@josephanson/nuxt-ai
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@josephanson/nuxt-ai?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@josephanson/nuxt-ai
[license-src]: https://img.shields.io/github/license/josephanson/nuxt-ai.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/josephanson/nuxt-ai/blob/main/LICENSE.md
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@josephanson/nuxt-ai
