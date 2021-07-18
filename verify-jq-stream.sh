mkdir -p out
cat $1 | node clarinet/path.js > out/clpath.jsonl
cat $1 | deno run jsonhilo/path.js > out/jhpath.jsonl
cat $1 | jq -c --stream . > out/jqpath.jsonl

diff -s out/clpath.jsonl out/jhpath.jsonl
diff -s out/clpath.jsonl out/jqpath.jsonl
