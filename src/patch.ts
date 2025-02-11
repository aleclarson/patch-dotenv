import { Node, parse } from './parse'
import { stringify } from './stringify'

export function patch(
  content: string,
  callback: (
    variables: Record<string, string | null | undefined>,
    nodes: Node[]
  ) => void
) {
  const nodes = parse(content.trimEnd())
  const variables: Record<string, string> = {}

  let separator: string | undefined
  for (const node of nodes) {
    if (node.kind === 'variable') {
      variables[node.name] = node.value
      separator ??= node.nameSuffix + '=' + node.valuePrefix
    }
  }
  separator ??= '='

  const originalNodeCount = nodes.length
  const originalValues = { ...variables }

  callback(variables, nodes)

  // Filter out empty variables, and update any variable nodes whose
  // value was changed through the variables object.
  const patchedNodes = nodes.filter(node => {
    if (node.kind === 'variable') {
      const value = variables[node.name]
      if (!value) {
        return false
      }
      if (value !== originalValues[node.name]) {
        node.value = value
      }
    }
    return true
  })

  let patchedContent = patchedNodes.map(stringify).join('\n')

  // Include variables added through the variables object.
  patchedContent += Object.keys(variables)
    .filter(key => !originalValues[key])
    .map(
      (key, i) =>
        (i > 0 || nodes.length > 0 ? '\n' : '') +
        `${key}${separator}${variables[key]}`
    )
    .join('')

  // Preserve blank lines at the end of the file.
  const outro = originalNodeCount > 0 ? content.match(/\n*$/)![0] : '\n'

  return patchedContent + outro
}
