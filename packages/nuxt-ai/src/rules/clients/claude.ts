import type { RuleOptions } from '../types'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'

import { join } from 'pathe'
import { BaseRuleClient } from './base'

/**
 * Client for Claude AI rules
 *
 * Generates rules in Claude's markdown format and manages a central CLAUDE.md file
 */
export class ClaudeRuleClient extends BaseRuleClient {
  private rulesBuffer: string[] = []

  /**
   * Create a new Claude rule client
   * @param rulesDir Base directory for individual rule files
   */
  constructor(rulesDir: string) {
    super(rulesDir)
  }

  /**
   * Formats and buffers a rule based on the given options.
   * @param options Rule options
   */
  async createRule(options: RuleOptions): Promise<void> {
    const content = this.formatContent(options)
    this.rulesBuffer.push(content)
  }

  /**
   * Ensure the Claude rules directory exists
   */
  async ensureDirectory(): Promise<void> {
    // No need to create a specific directory for Claude rules
    // as all rules are stored in a single file
  }

  /**
   * Cleans up existing nuxt-ai-generated sections from the CLAUDE.md file.
   * This should be called before generating new rules.
   */
  async cleanup(): Promise<void> {
    const claudeFilePath = join(this.rulesDir, 'CLAUDE.md')
    if (existsSync(claudeFilePath)) {
      try {
        const content = await readFile(claudeFilePath, 'utf-8')
        // Use regex to remove all nuxt-ai-generated sections
        // Ensure the closing tag is required for a match
        const nuxtAiGeneratedPattern = /<nuxt-ai-generated>[\s\S]*?<\/nuxt-ai-generated>/g
        const newContent = content.replaceAll(nuxtAiGeneratedPattern, '').trim()

        // Only write back if content changed
        if (newContent !== content) {
          await writeFile(claudeFilePath, newContent)
        }
      }
      catch (error) {
        console.error('Error cleaning up Claude rules file:', error)
      }
    }
  }

  /**
   * Format rule content according to Claude specifications
   * @param options Rule options
   * @returns Formatted rule content as string
   */
  formatContent(options: RuleOptions): string {
    const alwaysApply = options.alwaysApply !== undefined ? options.alwaysApply : false

    // Format the content as a markdown rule
    let content = `## ${options.name}\n\n`
    content += `**Description**: ${options.description}\n\n`

    // Add context
    content += `### Context\n${options.context}\n\n`

    // Add requirements
    content += '### Requirements\n'
    for (const requirement of options.requirements) {
      content += `- ${requirement}\n`
    }
    content += '\n'

    // Add critical rules if present
    if (options.criticalRules && options.criticalRules.length > 0) {
      content += '### Critical Rules\n'
      for (const rule of options.criticalRules) {
        content += `- ${rule}\n`
      }
      content += '\n'
    }

    // Add good examples
    content += '### Good Examples\n'
    for (const example of options.goodExamples) {
      // Indent example blocks for clarity within the rule
      const indentedExample = example.split('\n').map(line => `  ${line}`).join('\n')
      content += `\`\`\`\n${indentedExample}\n\`\`\`\n\n`
    }

    // Add bad examples if present
    if (options.badExamples && options.badExamples.length > 0) {
      content += '### Bad Examples\n'
      for (const example of options.badExamples) {
        // Indent example blocks for clarity within the rule
        const indentedExample = example.split('\n').map(line => `  ${line}`).join('\n')
        content += `\`\`\`\n${indentedExample}\n\`\`\`\n\n`
      }
    }

    // Remove trailing newlines from the formatted content
    return content.trim()
  }

  /**
   * Writes all buffered rules to the central CLAUDE.md file.
   * This should be called after all rules have been processed via createRule.
   */
  async finalize(): Promise<void> {
    if (this.rulesBuffer.length === 0) {
      console.log('No Claude rules generated, skipping file write.')
      return
    }

    const claudeFilePath = join(this.rulesDir, 'CLAUDE.md')
    const aggregatedContent = this.rulesBuffer.join('\n\n---\n\n') // Separate rules clearly
    const finalBlock = `<nuxt-ai-generated>\n${aggregatedContent}\n</nuxt-ai-generated>\n`

    try {
      console.log('Writing aggregated Claude rules file')
      let existingContent = ''
      if (existsSync(claudeFilePath)) {
        existingContent = await readFile(claudeFilePath, 'utf-8')
        // Ensure there's separation if existing content is not empty and doesn't end with double newline
        if (existingContent.length > 0 && !existingContent.endsWith('\n\n')) {
          existingContent += existingContent.endsWith('\n') ? '\n' : '\n\n'
        }
      }

      const newContent = existingContent + finalBlock
      await writeFile(claudeFilePath, newContent)
      console.log(`Successfully wrote ${this.rulesBuffer.length} rules to ${claudeFilePath}`)

      // Clear the buffer after writing
      this.rulesBuffer = []
    }
    catch (error) {
      console.error('Error writing aggregated Claude rules file:', error)
      throw error // Re-throw so caller knows something went wrong
    }
  }
}
