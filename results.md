<h1>Benchmark results</h1>
<p>The results are sorted from fastest (best) to slowest (worst).</p>
<h2>Validate</h2>
<p>Validate a JSON sample by parsing it without doing anything with the result.</p>
<table><tr><th>command</th>
<th>average time (s)</th>
<th>ratio</th></tr>
<tr><td>deno run jsonhilo/empty.js < data/npm.json</td>
<td>0.262</td>
<td>1.000</td></tr>
<tr><td>jq -c --stream empty < data/npm.json</td>
<td>0.370</td>
<td>1.412</td></tr>
<tr><td>node clarinet/empty.js < data/npm.json</td>
<td>0.492</td>
<td>1.878</td></tr></table>
<h2>Count</h2>
<p>Count all values in a JSON sample. jsonhilo is tested using both its low- and high- level interfaces.</p>
<table><tr><th>command</th>
<th>average time (s)</th>
<th>ratio</th></tr>
<tr><td>deno run jsonhilo/values.js < data/npm.json</td>
<td>0.250</td>
<td>1.000</td></tr>
<tr><td>node clarinet/values.js < data/npm.json</td>
<td>0.486</td>
<td>1.944</td></tr>
<tr><td>deno run jsonhilo/values.high.js < data/npm.json</td>
<td>0.494</td>
<td>1.976</td></tr>
<tr><td>sh jqcount.sh < data/npm.json</td>
<td>0.774</td>
<td>3.096</td></tr></table>
<h2>jq stream</h2>
<p>Transform a JSON sample into <a href="https://stedolan.github.io/jq/manual/#Streaming">jq streamed form</a>. jq should be fastest here.</p>
<table><tr><th>command</th>
<th>average time (s)</th>
<th>ratio</th></tr>
<tr><td>jq -c --stream . < data/npm.json</td>
<td>0.722</td>
<td>1.000</td></tr>
<tr><td>deno run jsonhilo/path.js < data/npm.json</td>
<td>1.168</td>
<td>1.618</td></tr>
<tr><td>node clarinet/path.js < data/npm.json</td>
<td>1.546</td>
<td>2.141</td></tr></table>
