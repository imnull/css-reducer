import { weight, match } from './src'

console.log(weight('div.a#aa #b:hover > .c::before[href^=123], a.b#c::before:hover'))

console.log(match(
    'a.aa a, b.aaa > aa, a',
    {
        nodeName: 'A',
        id: 'aaa',
        className: ['b', 'a'],
        pseudoElement: 'before',
        parentNode: {
            nodeName: 'B',
            className: ['aaa'],
            parentNode: {
                nodeName: 'C',
                className: ['aaa'],
                parentNode: {
                    nodeName: 'A',
                    className: 'aaa',
                    parentNode: {
                        nodeName: 'B',
                        className: ['aaa'],
                        parentNode: {
                            nodeName: 'C',
                            className: 'aaa',
                            parentNode: {
                                nodeName: 'A',
                                className: 'aaa'
                            }
                        }
                    }
                }
            }
        }
    }
))

