const process = Deno.run({
  cmd: ["sh", "avg.sh", "values.sh", "data/npm.json"], 
  stdout: "piped",
  stderr: "piped"
});


const output = await process.output()
const outStr = new TextDecoder().decode(output);

console.log(outStr)

const error = await process.stderrOutput();
const errorStr = new TextDecoder().decode(error);

console.error(errorStr)

process.close();
