/**
 * Configuration options for an AI rule
 */
export interface RuleOptions {
  /** Unique filename for the rule */
  fileName: string
  /** Display name of the rule */
  name: string
  /** Short description of the rule's purpose */
  description: string
  /** File glob patterns this rule applies to */
  globs: string
  /** Detailed contextual information about the rule */
  context: string
  /** List of specific requirements to follow */
  requirements: string[]
  /** Examples of good code/usage */
  goodExamples: string[]
  /** Examples of code/usage to avoid */
  badExamples?: string[]
  /** Critical rules that must be followed */
  criticalRules?: string[]
  /** Whether to always apply the rule regardless of context */
  alwaysApply?: boolean
}

/**
 * Supported AI client types
 */
export type ClientType = 'cursor' | 'claude' | 'windsurf'

/**
 * Interface for client-specific rule formatters
 */
export interface RuleClient {
  /**
   * Ensure the rule directory exists
   */
  ensureDirectory: () => Promise<void>

  /**
   * Clean up old rule files
   */
  cleanup: () => Promise<void>

  /**
   * Create a rule file with the given options in the client's directory
   */
  createRule: (options: RuleOptions) => Promise<void>

  /**
   * Format rule content according to client specifications
   */
  formatContent: (options: RuleOptions) => string
}
