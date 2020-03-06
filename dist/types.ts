export { Selector } from 'css-what'

export type TWeight = [number, number, number, number]

export interface IDOMNode {
    nodeName: string
    nodeType?: number
    id?: string
    className?: string | string[]
    pseudo?: string
    pseudoElement?: string
    attributes?: { name: string, value: any }
    previousSibling?: IDOMNode
    nextSibling?: IDOMNode
    parentNode?: IDOMNode
    childNodes?: IDOMNode[]
}

export interface IMatchResult {
    selector: string
    weight: TWeight
    match: boolean
}