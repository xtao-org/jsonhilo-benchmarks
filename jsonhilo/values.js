import {JsonLow} from './JsonLow.js'

let count = 0
const counter = () => count += 1
const stream = JsonLow({
  closeArray: counter,
  closeObject: counter,
  closeFalse: counter,
  closeTrue: counter,
  closeNull: counter,
  closeNumber: counter,
  closeString: counter,
  end() {console.log(JSON.stringify(count))}
})

const bufLen = 2 * 1024 * 1024
const buf = new Uint8Array(bufLen)
let partialCodePoint = 0
let bytesRemain = 0

while (true) {
  const readLen = Deno.stdin.readSync(buf)
  if (readLen === null) break
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