window.DEBUG = true
let LOG = (sender, prefix, msg) => {
    !window.DEBUG
        ? null
        : (sender !== '')
            ? (prefix !== '')
               ? console.log(`[${sender}]`, fomatter(`${prefix}`), `${msg}`)
               : console.log(`[${sender}]`, `${msg}`)
            : (msg !== '')
                ? console.log(msg)
                : console.error('msg is empty')
}

const fomatter = (prefix) => {
    return `| ✔︎ ${prefix}${' '.repeat(15 - prefix.length)}|`
}