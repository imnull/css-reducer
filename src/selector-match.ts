import { parse as parseSelector, stringify as stringifySelector, Selector } from 'css-what'
import { weight } from './selector-weight'
import { IDOMNode, IMatchResult } from './types'


export const matchSelector = (selectors: Selector[], node: IDOMNode | undefined): boolean => {
    if(!node) return false
    const s = [ ...selectors ]
    while(s.length > 0) {
        const it = s.pop()
        if(!it) {
            return false
        }
        switch(it.type) {
            case 'tag': {
                return it.name === node.nodeName.toLowerCase() ? matchSelector(s, node) : false
            }
            case 'attribute': {
                switch(it.name) {
                    case 'class':
                        if(typeof node.className === 'string') {
                            let cls = node.className.split(/\s+/)
                            return cls.indexOf(it.value) > -1 ? matchSelector(s, node) : false
                        } else if(Array.isArray(node.className)) {
                            return node.className.indexOf(it.value) > -1 ? matchSelector(s, node) : false
                        } else {
                            return false
                        }
                    case 'id':
                        return node.id === it.value ? matchSelector(s, node) : false
                }
                break
            }
            case 'pseudo': {
                return node.pseudo === it.name ? matchSelector(s, node) : false
            }
            case 'pseudo-element': {
                return node.pseudoElement === it.name ? matchSelector(s, node) : false
            }
            case 'descendant': {
                let n = node.parentNode
                while(n && s.length > 0) {
                    if(matchSelector(s, n)) {
                        // s.pop()
                        break
                    }
                    n = n.parentNode
                }
                // console.log(n, s, matchSelector(s, n))
                return matchSelector(s, n)
            }
            case 'child': {
                return matchSelector(s, node.parentNode)
            }
        }
    }
    return true
}

export const match = (selector: string, node: IDOMNode): IMatchResult => {
    const bingo = parseSelector(selector).filter(s => matchSelector(s, node))
    const sel = stringifySelector(bingo)
    return {
        selector: sel,
        weight: weight(sel),
        match: bingo.length > 0,
    }
}