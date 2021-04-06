export type TWeight = [number, number, number, number]
export type TDOMNode = {
    nodeName: string
    id?: string
    className?: string | string[]
    style?: { [key: string]: any } | string
    pseudo?: string
    pseudoElement?: string
    attributes?: { name: string, value: any }
    previousSibling?: TDOMNode
    nextSibling?: TDOMNode
    parentNode?: TDOMNode
}
// export type TStyleSheetItem = {
//     selectors: string[]
//     declarations: {
//         [key: string]: string;
//     }
// }
export type TStyleSheetItem = [
    string[],
    { [key: string]: string }
]

export type TTestItem = RegExp | { (val: any): boolean } | string | string[]