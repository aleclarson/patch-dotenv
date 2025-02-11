# patch-dotenv

Patch a `.env` file in place, preserving the existing formatting.

```sh
pnpm add patch-dotenv
```

#### Why make this?

I have scripts that provide environment variables to my app, but I also wanted to allow manually setting variables in the same file.

## CLI Commands

When using the CLI, keys are always converted to uppercase.

- `set <file> <key> <value>`: Sets a variable in the specified .env file.

```sh
patch-dotenv set .env my_key my_value
```

- `unset <file> <key>`: Unsets a variable in the specified .env file.

```sh
patch-dotenv unset .env my_key
```

- Aliases for `unset`: `del`, `rm`, `delete`, `remove`.

## API Documentation

### `parse(content: string): Node[]`

Parses a string into an array of `Node` objects, representing the structure of a .env file.

### `patch(content: string, patch: PatchCallback | Variables)`

Parses the content, applies the changes defined in the `patch` argument, and returns the patched content. The `patch` argument can be either a callback function or a `Variables` object (representing the variables to set). If it's a callback, it receives a `variables` object (representing the variables in the .env file) and the `nodes` array.

### `patchFile(file: string, patch: PatchCallback | Variables)`

Reads a file, patches its content using the `patch` function, and writes the patched content back to the file. The `patch` argument can be either a callback function or a `Variables` object (representing the variables to set).

### `stringify(node: Node)`

Converts a `Node` object back into a string representation suitable for writing to a .env file.

### `Node` Types

- `Space`: Represents an empty line.
- `Comment`: Represents a comment line (starting with `#`).
- `Variable`: Represents a variable assignment (e.g., `KEY=value`).

### Other Types

- `PatchCallback`: Represents a callback function that receives a `variables` object and a `nodes` array.
- `Variables`: Represents a map of variable names to values.
