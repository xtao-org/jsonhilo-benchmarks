var clarinet   = require('./clarinet')
  , p
  ;

p          = clarinet.parser();

const closer = () => {
  const last = path[path.length - 1]
  if (last === 0) {
    path.pop()
    console.log(JSON.stringify([path, []]))
  } else if (last === undefined) {
    path.pop()
    console.log(JSON.stringify([path, {}]))
  } else {
    if (typeof path[path.length - 1] === 'number') path[path.length - 1]--
    console.log(JSON.stringify([path]))
    path.pop()
  }
  if (typeof path[path.length - 1] === 'number') {
    path[path.length - 1]++
  }
}

let path = []
p.onopenobject = (key) => {
  path.push(key)
}
p.oncloseobject = closer
p.onopenarray = () => {
  path.push(0)
}
p.onclosearray = closer

p.onkey = (key) => {
  path[path.length - 1] = key
}
p.onvalue = (value) => {
  console.log(JSON.stringify([path, value]))
  if (typeof path[path.length - 1] === 'number') path[path.length - 1]++
}

process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(chunk) { 
  p.write(chunk); 
});
process.stdin.on('end', function () {
  p.end(); 
  process.exit();
});