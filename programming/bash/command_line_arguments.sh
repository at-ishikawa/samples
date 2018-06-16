#! /bin/bash

if [ $# -eq 0 ]; then
    # Testing purpose
    set -x
    echo "Run this script with many options: $0"
    bash $0 --help # long option
    bash $0 -f input_file_name.txt # short option with an argument
    bash $0 --file input_file_name.txt -d # a long option with an argument and a short option
    bash $0 --invalid-option # invalid option
    exit 0
fi

file=
is_debug=false
is_help=false

while [ $# -gt 0 ]
do
    opt="$1"
    case $opt in
        -d|--debug)
            is_debug=true
            shift
            ;;
        -f|--file)
            file="$2"
            shift
            ;;
        -h|--help)
            is_help=true
            ;;
        *)
            is_help=true
            ;;
    esac
    shift
done

echo "file: $file"
echo "is_debug: $is_debug"
echo "is_help: $is_help"
