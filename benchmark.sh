echo '<h1>Benchmark results</h1>
<p>The results are sorted from fastest (best) to slowest (worst).</p>' > $1

echo '<h2>Validate</h2>
<p>Validate a JSON sample by parsing it without doing anything with the result.</p>' >> $1
sh avg.sh empty.sh data/npm.json >> $1

echo '<h2>Count</h2>
<p>Count all values in a JSON sample. jsonhilo is tested using both its low- and high- level interfaces.</p>' >> $1
sh avg.sh values.sh data/npm.json >> $1

echo '<h2>jq stream</h2>
<p>Transform a JSON sample into <a href="https://stedolan.github.io/jq/manual/#Streaming">jq streamed form</a>. jq should be fastest here.</p>' >> $1
sh avg.sh path.sh data/npm.json >> $1