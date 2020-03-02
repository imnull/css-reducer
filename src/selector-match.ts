import { parse as parseSelector } from 'css-what'

export interface TDOMNode {
    nodeName: string
    nodeType?: number
    id?: string
    className?: string[]
    pseudo?: string
    pseudoElement?: string
    parentNode?: TDOMNode
    properties?: { name: string, value: any }
}

export const match = (selector: string, node: TDOMNode): any[] => {
    return parseSelector(selector).filter(_s => {
        const s = [ ..._s ]
        while(s.length > 0) {
            const it = s.pop()
            switch(it.type) {
                case 'tag':
                    if(it.name !== node.nodeName.toLowerCase()) {
                        return false
                    }
                    break
                case 'attribute':
                    switch(it.name) {
                        case 'class':
                            if(!Array.isArray(node.className) || node.className.indexOf(it.value) < 0) {
                                return false
                            }
                            break
                        case 'id':
                            if(node.id !== it.value) {
                                return false
                            }
                            break
                    }
                    break
                case 'pseudo':
                    if(node.pseudo !== it.name) {
                        return false
                    }
                    break
                case 'pseudo-element':
                    if(node.pseudoElement !== it.name) {
                        return false
                    }
                    break
            }
        }
        return true
    })
}

console.log(match(
    'a.a.b#aaa:hover::before',
    {
        nodeName: 'A',
        id: 'aaa',
        className: ['b', 'a'],
        pseudoElement: 'before',
    }
))