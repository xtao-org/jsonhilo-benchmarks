mkdir -p out
cat $1 | node clarinet/values.js > out/clvalues
cat $1 | deno run jsonhilo/values.js > out/jhvalues
cat $1 | sh jqcount.sh > out/jqvalues

diff -s out/clvalues out/jhvalues
diff -s out/clvalues out/jqvalues
