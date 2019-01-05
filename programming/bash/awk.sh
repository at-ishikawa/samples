#! /bin/bash

STR=$(cat <<EOF
1   name1   todo
2   name2   "in progress"
3   name3   done
EOF
)

echo "BEGIN ~ and END can be used before/after processing each line"
printf "$STR" | awk 'BEGIN{print "name list"} {print $2} END{print "DONE"}'

echo "Pattern matching"
printf "$STR" | awk '/done$/ { print $0}'

echo "awk can process arguments"
awk 'BEGIN {
   for (i = 0; i < ARGC - 1; ++i) {
      printf "ARGV[%d] = %s\n", i, ARGV[i]
   }
}' one two three four
# More variables are seen in https://www.tutorialspoint.com/awk/awk_built_in_variables.htm

echo "awk can do the same thing as other programming languages"
echo "$STR" | awk '
function print_as_upper_case(str) {
     print str | "tr [a-z] [A-Z]"
}
{
     if ($3 == "done") print_as_upper_case($2)
     else print $2 " need to do something"
}'
