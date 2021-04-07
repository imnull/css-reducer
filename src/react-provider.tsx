import * as React from 'react'
import { compute } from './compute'
import { TStyleSheetItem, TDOMNode } from './type'

const isComponent = (v: any) => v && typeof v === 'object' && typeof v.$$typeof === 'symbol'
const isList = (v: any) => Array.isArray(v)

let ID = 0
const newKey = () => `_id_${++ID}`

class Wrapper extends React.Component<{
    styles: TStyleSheetItem[]
    dom: TDOMNode
    componentType: any
    componentProps: any
    componentRef: any
}> {
    render() {
        const { styles, dom, children, componentType, componentProps, componentRef } = this.props
        const style = compute(styles, dom)
        return React.createElement(componentType, { ...componentProps, style, ref: componentRef }, children)
    }
}

const parseComponentInstance = (instance: any, styles: TStyleSheetItem[], parentNode: any = null, customKey: any = null) => {
    if(isComponent(instance)) {
        const { type, ref, props, key } = instance
        const _key = customKey || key || newKey()
        const { className = '', style = null, children, ...rest } = props
        const dom = { className, style, styles, nodeName: type, parentNode }
        return (
            <Wrapper
                key={_key}
                styles={styles}
                dom={dom}
                componentType={type}
                componentProps={rest}
                componentRef={ref}
            >{parseComponentInstance(children, styles, dom)}</Wrapper>
        )
    } else if(isList(instance)) {
        const baseKey = customKey || newKey()
        return instance.map((child: any, i: number) => {
            return parseComponentInstance(child, styles, parentNode, `${baseKey}_${i}`)
        })
    } else {
        return instance
    }
}

export default class Provider extends React.Component<{
    styles: TStyleSheetItem[]
}> {
    render() {
        const { styles, children } = this.props
        return parseComponentInstance(children, styles)
    }
}