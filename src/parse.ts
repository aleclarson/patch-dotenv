export declare namespace Node {
  export type Space = {
    kind: 'space'
  }
  export type Comment = {
    kind: 'comment'
    text: string
  }
  export type Variable = {
    kind: 'variable'
    name: string
    value: string
    /** The whitespace after the name. */
    nameSuffix: string
    /** The whitespace before the value. */
    valuePrefix: string
    /** The character used to quote the value. */
    quoteChar: string
  }
}

export type Node = Node.Space | Node.Comment | Node.Variable

export function parse(content: string): Node[] {
  if (content === '') {
    return []
  }
  return content.split('\n').map((line, lineNumber) => {
    line = line.trim()

    // Empty line
    if (!line) {
      return { kind: 'space' }
    }

    // Comment
    if (line.startsWith('#')) {
      return {
        kind: 'comment',
        text: line.slice(1).trim(),
      }
    }

    // Variable
    const separatorOffset = line.indexOf('=')
    if (separatorOffset > 0) {
      const rawName = line.slice(0, separatorOffset)
      const rawValue = line.slice(separatorOffset + 1)
      const trimmedName = rawName.trimEnd()
      const trimmedValue = rawValue.trimStart()
      const unquotedValue = trimQuotes(trimmedValue)

      return {
        kind: 'variable',
        name: trimmedName,
        nameSuffix: ' '.repeat(rawName.length - trimmedName.length),
        value: unquotedValue,
        valuePrefix: ' '.repeat(rawValue.length - trimmedValue.length),
        quoteChar:
          trimmedValue.length !== unquotedValue.length ? trimmedValue[0] : '',
      }
    }

    throw new SyntaxError(`Unsupported syntax on line ${lineNumber}`)
  })
}

function trimQuotes(value: string): string {
  if (value.length < 2) {
    return value
  }
  if (value[0] === '"' && value[value.length - 1] === '"') {
    return value.slice(1, -1)
  }
  if (value[0] === "'" && value[value.length - 1] === "'") {
    return value.slice(1, -1)
  }
  return value
}
