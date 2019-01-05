#! /bin/bash

# This page is useful to learn sed
# https://www.tutorialspoint.com/sed/index.htm

STR=$(cat <<EOF
<html>
<head>
  <title>Title</title>
</head>
<body>
<div class="main">
  <div>
    <span>Table of contents</span>
    <ul class="toc__list">
      <li class="toc__list__item">sed</li>
      <li class="toc__list__item">awk</li>
      <li class="toc__list__item">xargs</li>
    </ul>
  </div>
</div>
</body>
</html>
EOF
)

function string_command_replace() {
    echo "&: stores matched pattern and repeat on next lines"

    echo "s/pattern/replacement/[flags]"
    echo "Replace only matched line"
    printf "$STR" | sed '/toc__list/ s/class/id/g'

    echo "flags' details"
    echo "2: replace 2nd occurence of a"
    echo "p: show only changed lines"
    echo "w: write a file"
    echo "i: case insensitive"

    echo "\(\) can be used to group substrings, and \N can be used to refer those substrings"
    echo "Three,One,Two" | sed 's|^\(.*\),\(.*\),\(.*\)$|\2,\3,\1|'

    # See https://www.tutorialspoint.com/sed/sed_regular_expressions.htm for more regular expressions

}

function commands() {
    echo "nd command: delete n-th line"
    echo "n,md: delete from n to m lines. $ represents the last line. +m can be used to show next m lines. ~m shows every m lines after n"
    echo "n!d deletes except n-th line"
    seq 6 | sed -e 1d -e 3,5d -e '2!d'

    # https://www.thegeekstuff.com/2009/12/unix-sed-tutorial-7-examples-for-sed-hold-and-pattern-buffer-operations/
    echo "hold space"
    echo "h H: copy/append contents of the pattern space to the hold space"
    echo "g G: copy/append contents of the hold space into the pattern space"
    echo "x: exchange the contents of the hold space and the pattern space"
    echo "When append contents, the former and new contents are separated by newline"
    seq 6 | sed -n '1!G;h;$p' # Reverse lines

    echo "p: print, n: print pattern space"
    echo "r: read a file, w: write to a file"
    echo "a: append lines, c: change lines, i: insert lines, d: delete lines"
    echo "y: translate letters into others that have the same size"
    echo "l: show command sequences"
    echo "q: quit a command, e: execute an external command, like date, uname..."
    echo "upper case letter like P: handles multiple lines"
    echo "=: print line number"

}

function options() {
    echo "-n option: Do not output stdout by default. But command with 'p' prints the output"
    printf "${STR}" | sed -n ''
}

options
commands
string_command_replace
