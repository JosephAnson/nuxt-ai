import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'pathe'

export interface ReadFilesOptions {
  /** File extensions to include (e.g., ['.ts', '.vue']) */
  extensions?: string[]
  /** Whether to include subdirectories */
  recursive?: boolean
  /** Encoding for reading files (defaults to 'utf-8') */
  encoding?: BufferEncoding
}

/**
 * Read files from a directory with flexible filtering options
 * @param dir Directory path to read files from
 * @param options Configuration options for reading files
 * @returns Array of file contents as strings
 */
export function readFiles(dir: string, options: ReadFilesOptions = {}): string[] {
  const {
    extensions = [],
    recursive = false,
    encoding = 'utf-8',
  } = options

  try {
    const files = readdirSync(dir, { recursive }) as string[]
    return files
      .filter((file) => {
        // Apply extension filter if provided
        if (extensions.length > 0) {
          return extensions.some(ext => file.endsWith(ext))
        }
        // No filter means include all files
        return true
      })
      .map(file => readFileSync(join(dir, file), encoding).toString())
  }
  catch (error) {
    console.error(`Failed to read files from ${dir}:`, error)
    return []
  }
}
