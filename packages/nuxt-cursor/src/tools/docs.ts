import type { McpToolContext, ModuleOptions } from '../types'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { downloadTemplate } from 'giget'
import { z } from 'zod'

export type Documentation = Record<string, {
  url: string
}>

export async function toolsDocs({ mcp }: McpToolContext, options: ModuleOptions): Promise<void> {
  const docsMap: Documentation = {
    'nuxt': {
      url: 'github:nuxt/nuxt/docs#main',
    },
    'nuxt-content': {
      url: 'github:nuxt/content/docs#main',
    },
    'nuxt-ui': {
      url: 'github:nuxt/ui/tree/v3/docs/content',
    },
    ...options.additionalDocs,
  }

  // Helper function to download and get docs directory
  async function getDocsDir(docs: keyof typeof docsMap): Promise<string> {
    const { dir } = await downloadTemplate(docsMap[docs].url, {
      dir: `.nuxt-docs-temp/${docs}`,
      force: true,
    })
    return dir
  }

  const sharedSchema = z
    .enum(Object.keys(docsMap) as [string, ...string[]])
    .transform(key => key as keyof typeof docsMap)
    .describe('Name of the module to get info about')

  mcp.tool(
    'list-documentation-files',
    'List all available documentation files and folders for a specific Nuxt module.',
    {
      docs: sharedSchema,
    },
    async ({ docs }) => {
      try {
        const dir = await getDocsDir(docs)
        const files: string[] = []
        const folders: string[] = []

        const scanDocs = async (path: string, relativeTo: string): Promise<void> => {
          const entries = await readdir(path, { withFileTypes: true })

          for (const entry of entries) {
            const fullPath = join(path, entry.name)
            const relativePath = fullPath.replace(`${relativeTo}/`, '')

            if (entry.isDirectory()) {
              folders.push(relativePath)
              await scanDocs(fullPath, relativeTo)
            }
            else if (entry.name.endsWith('.md')) {
              files.push(relativePath)
            }
          }
        }

        await scanDocs(dir, dir)

        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify({ files, folders }, null, 2),
          }],
        }
      }
      catch (error: unknown) {
        console.error('Error listing documentation files:', error)
        return {
          content: [{
            type: 'text' as const,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          }],
        }
      }
    },
  )

  mcp.tool(
    'read-documentation-file',
    'Read a specific documentation file from a Nuxt module.',
    {
      docs: sharedSchema,
      filepath: z.string().describe('Relative path to the documentation file'),
    },
    async ({ docs, filepath }) => {
      try {
        const dir = await getDocsDir(docs)
        const fullPath = join(dir, filepath)

        if (!filepath.endsWith('.md')) {
          throw new Error('Only markdown files can be read')
        }

        const content = await readFile(fullPath, 'utf-8')

        return {
          content: [{
            type: 'text' as const,
            text: content,
          }],
        }
      }
      catch (error: unknown) {
        console.error('Error reading documentation file:', error)
        return {
          content: [{
            type: 'text' as const,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          }],
        }
      }
    },
  )

  mcp.tool(
    'read-documentation-files',
    'Read multiple documentation files from a Nuxt module.',
    {
      docs: sharedSchema,
      filepaths: z.array(z.string()).describe('Array of relative paths to the documentation files'),
    },
    async ({ docs, filepaths }) => {
      try {
        const dir = await getDocsDir(docs)
        const results: Record<string, string> = {}

        for (const filepath of filepaths) {
          if (!filepath.endsWith('.md')) {
            throw new Error(`Only markdown files can be read: ${filepath}`)
          }

          const fullPath = join(dir, filepath)
          try {
            results[filepath] = await readFile(fullPath, 'utf-8')
          }
          catch (error) {
            results[filepath] = `Error reading file: ${error instanceof Error ? error.message : String(error)}`
          }
        }

        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(results, null, 2),
          }],
        }
      }
      catch (error: unknown) {
        console.error('Error reading documentation files:', error)
        return {
          content: [{
            type: 'text' as const,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          }],
        }
      }
    },
  )
}
