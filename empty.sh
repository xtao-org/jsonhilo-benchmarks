for value in {1..5}
do
	sh catime.sh 'node clarinet/empty.js' $1
	sh catime.sh 'deno run jsonhilo/empty.js' $1
	sh catime.sh 'jq -c --stream empty' $1
done
