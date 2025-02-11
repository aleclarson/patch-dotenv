import fs from 'node:fs'
import { patch as applyPatch, PatchCallback, Variables } from './patch'

export function patchFile(file: string, patch: PatchCallback | Variables) {
  let content: string
  try {
    content = fs.readFileSync(file, 'utf8')
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error
    }
    content = ''
  }
  content = applyPatch(content, patch)
  fs.writeFileSync(file, content)
}
