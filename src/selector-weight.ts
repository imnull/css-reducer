import { parse, AttributeSelector } from 'css-what'

export type Weight = [number, number, number, number]

export const weights = (selector: string): Weight[] => {
    const ss = parse(selector)
    return ss.map(s => {
        let w: Weight = [0, 0, 0, 0]
        s.forEach(item => {
            const { type } = item
            switch(type) {
                case 'child':
                case 'parent':
                case 'sibling':
                case 'adjacent':
                case 'descendant':
                    // w = [0, 0, 0, 0]
                    break
                case 'tag':
                case 'pseudo':
                    w[3] += 1
                    break
                case 'attribute':
                    const { name } = item as AttributeSelector
                    switch(name) {
                        case  'class':
                            w[2] += 1
                            break
                        case 'id':
                            w[1] += 1
                            break
                    }
                    break;
                case 'pseudo-element':
                    w[2] += 1
                    break
            }
        })
        return w
    })
}

export const compair = (a: Weight, b: Weight) => {
    for(let i = 0; i < 4; i++) {
        if(a[i] > b[i]) {
            return 1
        } else if(a[i] < b[i]) {
            return -1
        }
    }
    return 0
}

export const weight = (selector: string) => {
    return weights(selector).sort(compair).pop()
}

// console.log(weight('div.a#aa #b:hover > .c::before[href^=123], a.b#c::before:hover'))