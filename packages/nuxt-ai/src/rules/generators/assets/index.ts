/// <reference types="vite/client" />
import type { RuleGenerator } from '../../utils/base'
import { join } from 'pathe'
import { readFiles } from '../../utils/readFiles'

// Read examples from directories
const badExamples = readFiles(join(__dirname, 'bad-examples'), {
  extensions: ['.ts'],
})
const goodExamples = readFiles(join(__dirname, 'good-examples'), {
  extensions: ['.ts'],
})

export function generateAssetsRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'assets',
    name: 'Nuxt Assets and Static Files',
    description: 'Follow best practices for handling assets, images, fonts, and styles in Nuxt',
    globs: '**/{assets,public}/**/*.{css,scss,less,styl,png,jpg,jpeg,gif,svg,woff,woff2,ttf,eot}',
    context: `Rules for managing assets in Nuxt applications.
- Assets in assets/ are processed by build tools
- Files in public/ are served as-is
- Use Nuxt Image for optimized images
- Use proper font loading strategies
- Implement proper CSS organization`,
    requirements: [
      'Use Nuxt Image for optimized images',
      'Implement proper image lazy loading',
      'Use responsive image sizes',
      'Implement proper font loading',
      'Use font preloading for critical fonts',
      'Implement proper CSS organization',
      'Use CSS variables for theming',
      'Implement proper media queries',
      'Use proper asset optimization',
      'Handle static files correctly',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'ALWAYS use Nuxt Image for image optimization',
      'Implement proper font loading strategies',
      'Use proper CSS organization and variables',
      'Handle responsive assets properly',
      'Optimize assets for production',
      'Use proper static file handling',
    ],
  })
}
