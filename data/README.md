# JSON data for benchmarking

`npm.json` from `https://github.com/dscape/clarinet/tree/master/samples/` -- can be obtained with:

```
wget https://raw.githubusercontent.com/dscape/clarinet/master/samples/npm.json
```

More interesting samples for testing and benchmarking:

```
wget https://raw.githubusercontent.com/dscape/clarinet/master/samples/creationix.json

wget https://raw.githubusercontent.com/simdjson/simdjson/master/jsonexamples/twitter.json

# WARNING: JSON file over 3 GB in size
curl https://dumps.wikimedia.org/other/wikibase/wikidatawiki/20210630/wikidata-20210630-lexemes.json.bz2 | bunzip2 > big.json
```