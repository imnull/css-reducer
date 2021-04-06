# css-computer

A tool to reduce class and inline styles.

## Combine className and style

In a web application, the UI is controlled by:
- css file (class attribute)
- inline style (style attribute)

But in `react native`, there is no css file part.

When I want to convert a `react-js` to a `react-native` project, converting style in files to inline-style object is a difficult job.

So, here it is, a tool to reduce css file and inline style, and combine both of them to a `react-style-object`.

## Style computing

Here is the computing workflow:
- Analytic css files and inline style, convert them to js-objects.
- Find the match rules from css files.
- Sort the rules by selector weight.
- Get the inherited styles from the parent node.
- Combine the inherited styles, sorted-rules styles, and inline style.

## Demo

```ts
import { resolve } from 'path'
import { getRulesFromFile, compute } from 'css-reducer'

// Some virtual dom structure
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
```

Checkout
```js
{
  fontWeight: 'bold',
  wordSpacing: '1px',
  lineHeight: '3em',
  textIndent: '100px',
  color: '#f00',
  fontSize: '38px',
  border: '1rpx solid #f00',
  width: '100px'
}
{
  fontWeight: 'bold',
  wordSpacing: '1px',
  lineHeight: '3em',
  textIndent: '100px',
  color: '#f00',
  fontSize: '15px',
  overflow: 'hidden'
}
```