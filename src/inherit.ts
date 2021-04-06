import { css2js } from './utils'


/**
 * ### 6 Assigning property values, Cascading, and Inheritance
 * #### 6.2 Inheritance
 * https://www.w3.org/TR/CSS22/cascade.html#inheritance
 */
export const inheritedProperties = [
    'azimuth',
    'border-collapse',
    'border-spacing',
    'caption-side',
    'color',
    'cursor',
    'direction',
    'elevation',
    'empty-cells',
    'font-family',
    'font-size',
    'font-style',
    'font-variant',
    'font-weight',
    'font',
    'letter-spacing',
    'line-height',
    'list-style-image',
    'list-style-position',
    'list-style-type',
    'list-style',
    'orphans',
    'pitch-range',
    'pitch',
    'quotes',
    'richness',
    'speak-header',
    'speak-numeral',
    'speak-punctuation',
    'speak',
    'speech-rate',
    'stress',
    'text-align',
    'text-indent',
    'text-transform',
    'visibility',
    'voice-family',
    'volume',
    'white-space',
    'widows',
    'word-spacing'
].map(s => css2js(s))


export const inherited = (style: { [key: string]: any }) => {
    return Object.keys(style).filter(key => {
        return inheritedProperties.indexOf(css2js(key)) > -1
    }).map(key => ({ [key]: style[key] })).reduce((r, v) => ({ ...r, ...v }), {})
}