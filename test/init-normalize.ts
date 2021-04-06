import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { getRules } from '../src/stylesheet'

const v1 = readFileSync(resolve(__dirname, '../normalize.v1.css'), 'utf-8')
const master = readFileSync(resolve(__dirname, '../normalize.css'), 'utf-8')
const custom = readFileSync(resolve(__dirname, '../normalize.custom.css'), 'utf-8')

const rules_v1 = getRules(v1, '')
const rules_master = getRules(master, '')
const rules_custom = getRules(custom, '')

writeFileSync(
    resolve(__dirname, '../src/normalize.ts'),
    `import { TStyleSheetItem } from './type'\n`
    + `export default ${
        JSON.stringify([ ...rules_v1, ...rules_master, ...rules_custom ])
        .replace(/^\[/, '[\n    ')
        .replace(/\]$/, '\n]')
        .replace(/\}\]\,\[\[/g, '}],\n    [[')
    } as TStyleSheetItem[]`,
    'utf-8'
)

console.log('done')