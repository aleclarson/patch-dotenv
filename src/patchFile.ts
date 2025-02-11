import fs from 'node:fs'
import { Node } from './parse'
import { patch } from './patch'

export function patchFile(
  file: string,
  callback: (
    variables: Record<string, string | null | undefined>,
    nodes: Node[]
  ) => void
) {
  let content: string
  try {
    content = fs.readFileSync(file, 'utf8')
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error
    }
    content = ''
  }
  content = patch(content, callback)
  fs.writeFileSync(file, content)
}
