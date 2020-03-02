const { parse } = require('css')
const { parse: parseSelector } = require('css-what')

console.log(parse(`
body {
    font-size: 16px;
}
`))

console.log(parseSelector(`
div.a#aa #b:hover > .c::before[href^=123]
`))