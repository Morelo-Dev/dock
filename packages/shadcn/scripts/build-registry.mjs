/**
 * Builds the final registry.json with file contents inlined.
 * Shadcn CLI expects file content embedded when served from a custom registry.
 *
 * Usage: node scripts/build-registry.mjs
 * Output: dist/registry.json
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = join(__dir, '..')
const srcDir = join(root, 'src')

const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf-8'))

const built = {
  ...registry,
  items: registry.items.map((item) => ({
    ...item,
    files: item.files.map((file) => {
      const filePath = join(srcDir, file.path)
      let content
      try {
        content = readFileSync(filePath, 'utf-8')
      } catch {
        console.warn(`  ⚠ Could not read ${filePath}`)
        content = ''
      }
      return { ...file, content }
    }),
  })),
}

mkdirSync(join(root, 'dist'), { recursive: true })
writeFileSync(join(root, 'dist', 'registry.json'), JSON.stringify(built, null, 2))
console.log('✓ dist/registry.json built')
