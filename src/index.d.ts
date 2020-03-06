import { IDOMNode, IMatchResult, TWeight, Selector } from './types'

export declare const weights: (selector: string) => TWeight[]
export declare const compair: (a: TWeight, b: TWeight) => number
export declare const weight: (selector: string) => TWeight

export declare const matchSelector: (selectors: Selector[], node: IDOMNode) => boolean
export declare const match: (selector: string, node: IDOMNode) => IMatchResult

export { IDOMNode, IMatchResult, TWeight }