const text = Deno.readTextFileSync(Deno.args[0])

const sections = text.split('\n\n')

console.assert(sections[sections.length - 1].trim() === '')
const sections2 = sections.map(s => s.split('\n')).slice(0, -1)

const obj = Object.create(null)

for (const s of sections2) {
  obj[s[0]] = (obj[s[0]] || []).concat(+s[1].split(' ')[1])
}

const res = Object.entries(obj).map(([k, v]) => {
  return [k, v.reduce((acc, s) => {
    return acc + s
  }, 0) / v.length]
}).sort(([, a], [, b]) => a - b)

const top = res[0][1]
const res2 = res.map(([k, v]) => [k, v.toFixed(3), (v / top).toFixed(3)])
const table = '<table><tr>' + ['command', 'average time (s)', 'ratio'].map(v => `<th>${v}</th>`).join('\n') + '</tr>\n' + (res2).map(row => row.map(v => `<td>${v}</td>`).join('\n')).map(r => `<tr>${r}</tr>`).join('\n') + '</table>'

console.log(table)