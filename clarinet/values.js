const clarinet = require('./clarinet')

const p = clarinet.parser()

let count = 0
const counter = () => {
  ++count
}
p.oncloseobject = counter
p.onclosearray = counter
p.onvalue = counter

process.stdin.setEncoding('utf-8')
process.stdin.on('data', function (chunk) { 
  p.write(chunk)
})
process.stdin.on('end', function () {
  p.end()
  console.log(JSON.stringify(count))
  process.exit()
})