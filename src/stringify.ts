import { Node } from './parse'

export function stringify(node: Node) {
  if (node.kind === 'comment') {
    return `# ${node.text}`
  }
  if (node.kind === 'variable') {
    return (
      node.name +
      node.nameSuffix +
      '=' +
      node.valuePrefix +
      node.quoteChar +
      node.value +
      node.quoteChar
    )
  }
  return ''
}
