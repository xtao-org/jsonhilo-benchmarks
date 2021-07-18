mkdir -p out
sh $1 $2 2> out/avg.result
deno run --allow-read avg.js out/avg.result