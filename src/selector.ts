import { parse, AttributeSelector, Selector } from 'css-what'
import { TWeight, TDOMNode } from './type'

export const compare = (a: TWeight, b: TWeight) => {
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
    const selectors = parse(selector)[0]
    const w: TWeight = [0, 0, 0, 0]
    selectors.forEach(item => {
        const { type } = item
        switch (type) {
            case 'child':
            case 'parent':
            case 'sibling':
            case 'adjacent':
            case 'descendant':
                break
            case 'tag':
            case 'pseudo':
                w[3] += 1
                break
            case 'attribute':
                const { name } = item as AttributeSelector
                switch (name) {
                    case 'class':
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
}

const matchSelector = (selectors: Selector[], node: TDOMNode | undefined): boolean => {
    if(selectors.length < 1) {
        return true
    }
    if(!node) {
        return false
    }
    const s = [ ...selectors ]
    const it = s.pop()
    if(!it) {
        return true
    }
    switch(it.type) {
        case 'tag': {
            return it.name === node.nodeName.toLowerCase() && matchSelector(s, node)
        }
        case 'attribute': {
            switch(it.name) {
                case 'class':
                    if(typeof node.className === 'string') {
                        let cls = node.className.split(/\s+/)
                        return cls.indexOf(it.value) > -1 && matchSelector(s, node)
                    } else if(Array.isArray(node.className)) {
                        return node.className.indexOf(it.value) > -1 && matchSelector(s, node)
                    } else {
                        return false
                    }
                case 'id':
                    return node.id === it.value && matchSelector(s, node)
            }
            break
        }
        case 'pseudo': {
            return node.pseudo === it.name && matchSelector(s, node)
        }
        case 'pseudo-element': {
            return node.pseudoElement === it.name && matchSelector(s, node)
        }
        case 'descendant': {
            let n = node.parentNode
            while(n && s.length > 0) {
                if(matchSelector(s, n)) {
                    break
                }
                n = n.parentNode
            }
            return matchSelector(s, n)
        }
        case 'child': {
            return matchSelector(s, node.parentNode)
        }
    }
  
    return false
}

export const match = (selector: string, node: TDOMNode) => {
    const selectors = parse(selector)[0]
    return matchSelector(selectors, node)
}