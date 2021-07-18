# cat $2 | time -v $1
echo "$1 < $2" >&2
cat $2 | time -p $1
echo '' >&2
