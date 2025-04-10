import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { consola } from 'consola'
import { dirname, join, resolve } from 'pathe'

const scriptDir = resolve(dirname(fileURLToPath(import.meta.url)))
const rulesBaseDir = resolve(scriptDir, '../src/rules/examples')
const outputDir = resolve(scriptDir, '../src/generated')
const outputFile = join(outputDir, 'examples.json')

const allExamples = {}

consola.info('[nuxt-ai] Bundling rule examples...')
consola.info(`[nuxt-ai] Reading examples from: ${rulesBaseDir}`)

function readFileContent(filePath) {
  try {
    if (existsSync(filePath)) {
      return readFileSync(filePath, 'utf-8').toString()
    }
  }
  catch (error) {
    consola.error(`[nuxt-ai] Failed to read file: ${filePath}`, error)
  }
  return ''
}

function readDirectoryExamples(dirPath) {
  const examples = []
  if (!existsSync(dirPath)) {
    consola.warn(`[nuxt-ai] Example directory not found: ${dirPath}`)
    return examples
  }
  try {
    const files = readdirSync(dirPath)
    for (const file of files) {
      const filePath = join(dirPath, file)
      const content = readFileContent(filePath)
      if (content) {
        examples.push(content)
      }
    }
  }
  catch (error) {
    consola.error(`[nuxt-ai] Failed to read example directory: ${dirPath}`, error)
  }
  return examples
}

try {
  const ruleDirs = readdirSync(rulesBaseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const ruleName of ruleDirs) {
    const ruleExampleBaseDir = join(rulesBaseDir, ruleName)
    const goodExamplesDir = join(ruleExampleBaseDir, 'good-examples')
    const badExamplesDir = join(ruleExampleBaseDir, 'bad-examples')

    allExamples[ruleName] = {
      good: readDirectoryExamples(goodExamplesDir),
      bad: readDirectoryExamples(badExamplesDir),
    }
  }

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
    consola.success(`[nuxt-ai] Created output directory: ${outputDir}`)
  }

  writeFileSync(outputFile, JSON.stringify(allExamples, null, 2))
  consola.success(`[nuxt-ai] Successfully bundled examples to: ${outputFile}`)
}
catch (error) {
  consola.error(`[nuxt-ai] Failed to bundle examples:`, error)
  process.exit(1)
}
