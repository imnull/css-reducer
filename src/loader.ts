import { getRulesFromFile } from './stylesheet'
function allInCssLoader(source: string) {
    const rules = getRulesFromFile(this.resource)
    const code = `export default ${JSON.stringify(rules)}`
    return code
}

export default allInCssLoader