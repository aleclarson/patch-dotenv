#!/usr/bin/env node
import util from 'node:util'
import { patchFile } from './patchFile'

const parsed = util.parseArgs({ allowPositionals: true })
const [file, command, ...args] = parsed.positionals

if (!file) {
  console.error('Error: File is required')
  process.exit(1)
}

const commands: Record<string, (...args: string[]) => void> = {
  set(key, value) {
    if (args.length !== 2) {
      console.error(`Usage: ${command} <key> <value>`)
      process.exit(1)
    }
    if (key === '') {
      console.error('Error: Key cannot be empty')
      process.exit(1)
    }
    if (value === '') {
      console.error('Error: Value cannot be empty')
      process.exit(1)
    }
    patchFile(file, variables => {
      variables[key.toUpperCase()] = value
    })
  },
  unset(key) {
    if (args.length !== 1) {
      console.error(`Usage: ${command} <key>`)
      process.exit(1)
    }
    patchFile(file, variables => {
      delete variables[key.toUpperCase()]
    })
  },
}

const aliases: Record<string, string> = {
  del: 'unset',
  rm: 'unset',
  delete: 'unset',
  remove: 'unset',
}

const action = commands[aliases[command] ?? command]
if (action) {
  action(...args)
} else {
  console.error(`Available commands: ${Object.keys(commands).join(', ')}`)
  process.exit(1)
}
