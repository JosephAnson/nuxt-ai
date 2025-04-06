import type { RuleOptions } from '../types'
import { existsSync, readdirSync, unlinkSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'

import { join } from 'pathe'
import { BaseRuleClient } from './base'

/**
 * Client for Cursor AI rules
 *
 * Generates rules in Cursor's .mdc format and places them in .cursor/rules directory
 */
export class CursorRuleClient extends BaseRuleClient {
  /**
   * Create a new Cursor rule client
   * @param rulesDir Base directory for rule files (not used directly)
   */
  constructor(rulesDir: string) {
    super(rulesDir)
  }

  /**
   * Create a rule with the given options
   * @param options Rule options
   */
  async createRule(options: RuleOptions): Promise<void> {
    const content = this.formatContent(options)
    await this.writeFile(options.fileName, content)
  }

  /**
   * Ensure the Cursor rules directory exists
   */
  async ensureDirectory(): Promise<void> {
    this.ensureDirectoryExists(this.rulesDir)
  }

  /**
   * Clean up old Cursor rule files
   */
  async cleanup(): Promise<void> {
    if (existsSync(this.rulesDir)) {
      const files = readdirSync(this.rulesDir)
      for (const file of files) {
        if (file.endsWith('.nuxt-ai.mdc')) {
          unlinkSync(join(this.rulesDir, file))
        }
      }
    }
  }

  /**
   * Write a Cursor rule file
   * @param name Rule file name
   * @param content Formatted rule content
   */
  async writeFile(name: string, content: string): Promise<void> {
    const filePath = join(this.rulesDir, `${name}.nuxt-ai.mdc`)
    await writeFile(filePath, content)
  }

  /**
   * Format a rule for Cursor
   * @param options Rule options
   * @returns Cursor-formatted rule content
   */
  formatContent(options: RuleOptions): string {
    const {
      name,
      description,
      globs,
      context,
      requirements,
      goodExamples,
      badExamples = [],
      criticalRules = [],
      alwaysApply = false,
    } = options

    return `---
description: ${description}
globs: ${globs}
alwaysApply: ${alwaysApply}
---

# ${name}

## Context
${context}

## Requirements
${requirements.map(req => `- ${req}`).join('\n')}

## Examples
${goodExamples.map(example => `<example>\n${example}\n</example>\n`).join('\n')}
${badExamples.map(example => `<example type="invalid">\n${example}\n</example>\n`).join('\n')}
${criticalRules.length > 0 ? `\n## Critical Rules\n${criticalRules.map(rule => `- ${rule}`).join('\n')}\n` : ''}`
  }
}
