import type { RuleOptions } from '../types'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { consola } from 'consola'
import { join } from 'pathe'
import { BaseRuleClient } from './base'

/**
 * Client for Windsurf AI rules
 *
 * Generates rules in Windsurf's markdown format and manages a central .windsurfrules file
 */
export class WindsurfRuleClient extends BaseRuleClient {
  private rulesBuffer: string[] = []

  /**
   * Create a new Windsurf rule client
   * @param rulesDir Base directory for individual rule files
   */
  constructor(rulesDir: string) {
    super(rulesDir)
  }

  /**
   * Formats and buffers a rule based on the given options.
   * @param options Rule options
   */
  async createRule(options: RuleOptions | RuleOptions[]): Promise<void> {
    if (Array.isArray(options)) {
      for (const option of options) {
        const content = this.formatContent(option)
        this.rulesBuffer.push(content)
      }
    }
    else {
      const content = this.formatContent(options)
      this.rulesBuffer.push(content)
    }
  }

  /**
   * Ensure the Windsurf rules directory exists
   */
  async ensureDirectory(): Promise<void> {
    // No need to create a specific directory for Windsurf rules
    // as all rules are stored in a single file
  }

  /**
   * Cleans up existing nuxt-ai-generated sections from the Windsurf rules file.
   * This should be called before generating new rules.
   */
  async cleanup(): Promise<void> {
    const windsurfFilePath = join(this.rulesDir, '.windsurfrules')
    if (existsSync(windsurfFilePath)) {
      try {
        const content = await readFile(windsurfFilePath, 'utf-8')
        const nuxtAiGeneratedPattern = /<nuxt-ai-generated>[\s\S]*?<\/nuxt-ai-generated>/g
        const newContent = content.replaceAll(nuxtAiGeneratedPattern, '').trim()

        if (newContent !== content) {
          await writeFile(windsurfFilePath, newContent)
        }
      }
      catch (error) {
        consola.error('Error cleaning up Windsurf rules file:', error)
      }
    }
  }

  /**
   * Format rule content according to Windsurf specifications
   * @param options Rule options
   * @returns Formatted rule content as string
   */
  formatContent(options: RuleOptions): string {
    let content = `## ${options.name}\n\n`
    content += `**Description**: ${options.description}\n\n`

    content += `### Context\n${options.context}\n\n`

    content += '### Requirements\n'
    for (const requirement of options.requirements) {
      content += `- ${requirement}\n`
    }
    content += '\n'

    if (options.criticalRules && options.criticalRules.length > 0) {
      content += '### Critical Rules\n'
      for (const rule of options.criticalRules) {
        content += `- ${rule}\n`
      }
      content += '\n'
    }

    content += '### Good Examples\n'
    for (const example of options.goodExamples) {
      // Indent example blocks for clarity within the rule
      const indentedExample = example.split('\n').map(line => `  ${line}`).join('\n')
      content += `\`\`\`\n${indentedExample}\n\`\`\`\n\n`
    }

    if (options.badExamples && options.badExamples.length > 0) {
      content += '### Bad Examples\n'
      for (const example of options.badExamples) {
        // Indent example blocks for clarity within the rule
        const indentedExample = example.split('\n').map(line => `  ${line}`).join('\n')
        content += `\`\`\`\n${indentedExample}\n\`\`\`\n\n`
      }
    }

    return content.trim()
  }

  /**
   * Writes all buffered rules to the central .windsurfrules file.
   * This should be called after all rules have been processed via createRule.
   */
  async finalize(): Promise<void> {
    if (this.rulesBuffer.length === 0) {
      return
    }

    const windsurfFilePath = join(this.rulesDir, '.windsurfrules')
    const aggregatedContent = this.rulesBuffer.join('\n\n---\n\n')
    const finalBlock = `<nuxt-ai-generated>\n${aggregatedContent}\n</nuxt-ai-generated>\n`

    let existingContent = ''
    if (existsSync(windsurfFilePath)) {
      existingContent = await readFile(windsurfFilePath, 'utf-8')
      if (existingContent.length > 0 && !existingContent.endsWith('\n\n')) {
        existingContent += existingContent.endsWith('\n') ? '\n' : '\n\n'
      }
    }

    const newContent = existingContent + finalBlock
    await writeFile(windsurfFilePath, newContent)

    this.rulesBuffer = []
  }
}
