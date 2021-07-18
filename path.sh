for value in {1..5}
do
	sh catime.sh 'node clarinet/path.js' $1 > /dev/null
	sh catime.sh 'deno run jsonhilo/path.js' $1 > /dev/null
	sh catime.sh 'jq -c --stream .' $1 > /dev/null
done
