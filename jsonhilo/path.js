import {JsonLow} from './JsonLow.js'

import {JsonEventToJsonHighEvent} from './JsonEventToJsonHighEvent.js'

let path = []
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
    // Deno.stdout.writeSync(enc.encode(JSON.stringify([path])))
    path.pop()
    // Deno.stdout.writeSync(enc.encode(JSON.stringify([path])))
  }
  if (typeof path[path.length - 1] === 'number') {
    // console.log(JSON.stringify([path]))
    path[path.length - 1]++
  }
}
const stream = JsonLow(JsonEventToJsonHighEvent({
  openArray: () => path.push(0),
  openObject: () => path.push(undefined),
  closeArray: closer,
  closeObject: closer,
  key: (key) => path[path.length - 1] = key,
  value: (value) => {
    console.log(JSON.stringify([path, value]))
    if (typeof path[path.length - 1] === 'number') path[path.length - 1]++
  },
}))

const bufLen = 2 * 1024 * 1024
const buf = new Uint8Array(bufLen)
let partialCodePoint = 0
let bytesRemain = 0

// let count = 0
while (true) {
  const readLen = Deno.stdin.readSync(buf)
  if (readLen === null) break
  // count += readLen
  let i = 0
  while (i < readLen) {
    const byte = buf[i]

    ++i
    if (bytesRemain > 0) {
      const bits = byte & 0b00111111
      --bytesRemain
      partialCodePoint |= bits << (bytesRemain * 6)

      if (bytesRemain === 0) {
        stream.push(partialCodePoint)
      }
    } 
    else if (byte < 128) stream.push(byte)
    else {
      if ((byte >> 5) === 0b110) {
        bytesRemain = 1
        partialCodePoint = (byte & 0b00011111) << 6
      }
      else if ((byte >> 4) === 0b1110) {
        bytesRemain = 2
        partialCodePoint = (byte & 0b00001111) << 12
      }
      else if ((byte >> 3) === 0b11110) {
        bytesRemain = 3
        partialCodePoint = (byte & 0b00000111) << 18
      }
      else {
        console.error(byte, byte.toString(2), String.fromCodePoint(byte))
        throw Error('unexpected')
      }
    }
  }

}
stream.end()