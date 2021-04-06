export const css2js = (s: any) => {
    if(typeof s !== 'string') {
        return s
    }
    return s.replace(/\-[a-z]/g, m => m.charAt(1).toUpperCase())
}

export const js2css = (s: any) => {
    if(typeof s !== 'string') {
        return s
    }
    return s.replace(/[A-Z]/, m => '-' + m.toLowerCase())
}

export const trimQuote = (s: any) => {
    if(typeof s !== 'string' || s.length < 2) {
        return s
    }
    s = s.trim()
    if(/^(["'])[\w\W]*\1$/.test(s)) {
        s = s.slice(1, -1)
    }
    return s
}

export const parseStyle = (style: any) => {
    const obj: { [key: string]: string } = {}
    if(typeof style !== 'string') {
        if(style && typeof style === 'object' || !Array.isArray(style)) {
            return style
        }
        return obj
    }
    style.replace(/([^\:\s]+)\s*\:\s*("[^"]*"|'[^']*'|\([^\)]\)|[^;$]*)/g, (m: string, m1: string, m2: string) => {
        obj[css2js(m1)] = m2.trim()
        return ''
    })
    return obj
}