import { resolve } from 'path'

import { getRulesFromFile, compute } from '../src'

const node1 = {
    nodeName: 'a',
    style: 'width: 100px;',
    className: 'b',
    parentNode: {
        nodeName: 'c',
        style: 'text-indent:100px;',
        parentNode: {
            style: 'word-spacing:1px;',
            nodeName: 'c'
        }
    }
}
const node2 = { nodeName: 'span', parentNode: node1 }

const rules1 = getRulesFromFile(resolve(__dirname, './base1.css'))


console.log(compute(rules1, node1))
console.log(compute(rules1, node2))