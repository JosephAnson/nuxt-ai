# nuxt-cursor

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

MCP server helping models to understand your Nuxt app better.

> [!IMPORTANT]
> Experimental. Not ready for production.

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  modules: ['nuxt-cursor'],
})
```

Then the MCP server will be available at `http://localhost:3000/__mcp/sse`.

If you are using Cursor, create a `.cursor/mcp.json` file in your project root, this plugin will automatically update it for you.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/josephanson/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/josephanson/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © [Joseph Anson](https://github.com/josephanson)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-cursor?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/nuxt-cursor
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-cursor?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/nuxt-cursor
[bundle-src]: https://img.shields.io/bundlephobia/minzip/nuxt-cursor?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=nuxt-cursor
[license-src]: https://img.shields.io/github/license/josephanson/nuxt-cursor.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/josephanson/nuxt-cursor/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/nuxt-cursor
