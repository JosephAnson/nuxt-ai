import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join } from 'pathe'

export interface RuleFileOptions {
  fileName: string
  name: string
  description: string
  globs: string
  context: string
  requirements: string[]
  goodExamples: string[]
  badExamples?: string[]
  criticalRules?: string[]
  alwaysApply?: boolean // Whether to always apply the rule
}

export class RuleGenerator {
  constructor(private rulesDir: string) {
    this.ensureRulesDir()
  }

  private ensureRulesDir(): void {
    if (!existsSync(this.rulesDir)) {
      mkdirSync(this.rulesDir, { recursive: true })
    }
  }

  cleanupOldRules(): void {
    if (existsSync(this.rulesDir)) {
      const files = readdirSync(this.rulesDir)
      for (const file of files) {
        if (file.endsWith('.nuxt-cursor.mdc')) {
          unlinkSync(join(this.rulesDir, file))
        }
      }
    }
  }

  async generateRuleFile(name: string, content: string): Promise<void> {
    const filePath = join(this.rulesDir, `${name}.nuxt-cursor.mdc`)
    await writeFile(filePath, content)
  }

  createRuleFile(options: RuleFileOptions): void {
    const {
      fileName,
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

    let content = `---
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
`

    // Add good examples
    if (goodExamples.length > 0) {
      goodExamples.forEach((example) => {
        content += `<example>\n${example}\n</example>\n\n`
      })
    }

    // Add bad examples
    if (badExamples.length > 0) {
      badExamples.forEach((example) => {
        content += `<example type="invalid">\n${example}\n</example>\n\n`
      })
    }

    // Add critical rules if provided
    if (criticalRules.length > 0) {
      content += `## Critical Rules\n`
      criticalRules.forEach((rule) => {
        content += `- ${rule}\n`
      })
    }

    this.generateRuleFile(fileName, content)
  }
}
