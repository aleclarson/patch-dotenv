# patch-dotenv

Patch a `.env` file in place, preserving the existing formatting.

```sh
pnpm add patch-dotenv
```

#### Why make this?

I have scripts that provide environment variables to my app, but I also wanted to allow manually setting variables in the same file.

## CLI Commands

- `set <file> <key> <value>`: Sets a variable in the specified .env file.
- `unset <file> <key>`: Unsets a variable in the specified .env file.
- Aliases for `unset`: `del`, `rm`, `delete`, `remove`.

## API Documentation

### `parse(content: string): Node[]`

Parses a string into an array of `Node` objects, representing the structure of a .env file.

### `patch(content: string, callback: (variables: Record<string, string | null | undefined>, nodes: Node[]) => void)`

Parses the content, applies the changes defined in the callback function, and returns the patched content. The callback receives a `variables` object (representing the variables in the .env file) and the `nodes` array.

### `patchFile(file: string, callback: (variables: Record<string, string | null | undefined>, nodes: Node[]) => void)`

Reads a file, patches its content using the `patch` function, and writes the patched content back to the file.

### `stringify(node: Node)`

Converts a `Node` object back into a string representation suitable for writing to a .env file.

### `Node` Types

- `Space`: Represents an empty line.
- `Comment`: Represents a comment line (starting with `#`).
- `Variable`: Represents a variable assignment (e.g., `KEY=value`).
