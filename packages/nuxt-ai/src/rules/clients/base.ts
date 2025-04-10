import type { RuleClient, RuleOptions } from '../types'
import { existsSync, mkdirSync } from 'node:fs'

/**
 * Abstract base class for rule clients with common functionality
 */
export abstract class BaseRuleClient implements RuleClient {
  /**
   * The base directory for storing rule files
   */
  protected rulesDir: string

  /**
   * Create a new rule client
   * @param rulesDir The base directory for storing rule files
   */
  constructor(rulesDir: string) {
    this.rulesDir = rulesDir
  }

  /**
   * Create the necessary directories for rule files
   */
  abstract ensureDirectory(): Promise<void>

  /**
   * Clean up old rule files
   */
  abstract cleanup(): Promise<void>

  /**
   * Write rule content to a file
   * @param name Rule file name
   * @param content Formatted rule content
   */
  abstract createRule(options: RuleOptions | RuleOptions[]): Promise<void>

  /**
   * Format rule content according to client specifications
   * @param options Rule options
   * @returns Formatted rule content as string
   */
  abstract formatContent(options: RuleOptions): string

  /**
   * Finalize the rule client
   */
  abstract finalize(): Promise<void>

  /**
   * Ensure a directory exists
   * @param dir Directory path
   */
  protected ensureDirectoryExists(dir: string): void {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
  }
}
