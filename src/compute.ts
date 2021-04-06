import { TStyleSheetItem, TDOMNode, TWeight } from './type'
import { weight, match, compare } from './selector'
import { inherited } from './inherit'
import { parseStyle } from './utils'
import normalize from './normalize'

const getMatchRules = (rules: TStyleSheetItem[], node: TDOMNode | null | undefined, inherit: { [key: string]: string } = {}) => {
    const matchRules = rules.map(([selectors, declarations], index) => {
        const bingos = selectors.filter(selector => match(selector, node))
        let selector = ''
        if(bingos.length === 1) {
            selector = bingos[0]
        } else if(bingos.length > 1) {
            selector = bingos.sort((a, b) => compare(weight(b), weight(a)))[0]
        }
        return selector ? { selector, declarations, weight: weight(selector), index } : null
    }).filter(n => !!n) as { selector: string, declarations: { [key: string]: any }, weight: TWeight, index: number }[]

    return matchRules.sort((a, b) => {
        const c = compare(a.weight, b.weight)
        return c === 0 ? a.index - b.index : c
    }).map(({ declarations }) => declarations).reduce((r, v) => ({ ...r, ...v }), { ...inherit })
}

const calUpperStyle = (node: TDOMNode | null | undefined) => {
    if(!node) {
        return {}
    }
    const arr = []
    while(node) {
        node.style && arr.unshift(parseStyle(node.style))
        node = node.parentNode
    }
    return arr.reduce((r, v) => ({ ...r, ...v }), {})
}


export const compute = (rules: TStyleSheetItem[], node?: TDOMNode | null) => {

    if(!node) {
        return {}
    }

    const parentCss = compute(rules, node.parentNode)
    const parentStyle = calUpperStyle(node.parentNode)
    const newStyle = getMatchRules([ ...normalize, ...rules ], node, inherited({ ...parentCss, ...parentStyle }))

    const finStyle = { ...newStyle, ...parseStyle(node.style) }
    return finStyle
}