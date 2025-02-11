import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
  },
  {
    entry: ['src/main.ts'],
    format: ['esm'],
  },
])
