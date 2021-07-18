# jsonhilo benchmarks

Comparing the performance of jsonhilo, clarinet, and jq.

Results are in [results.html](results.html).

If you have Node.js, Deno, and jq on your machine, you can regenerate the results with:

```
sh benchmark.sh
```

To verify that the benchmarks produce identical results run:

```
sh verify-count.sh data/npm.json 
```

and

```
sh verify-jq-stream.sh data/npm.json 
```