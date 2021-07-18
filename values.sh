for value in {1..5}
do
	sh catime.sh 'node clarinet/values.js' $1 > /dev/null
	#sh catime.sh 'node jsonhilo/values.node.js' $1
	sh catime.sh 'deno run jsonhilo/values.js' $1 > /dev/null
	sh catime.sh 'deno run jsonhilo/values.high.js' $1 > /dev/null
	#sh catime.sh 'deno run jsonhilo/values.low.js' $1
	sh catime.sh 'sh jqcount.sh' $1 > /dev/null
done
