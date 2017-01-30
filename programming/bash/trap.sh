#! /bin/bash

end() {
    echo 'end'
}

set -e
trap "echo 'trapped'; end" 0 1 2 3 15

echo 'Please type Ctrl-C to work trap'; sleep 1

# Error by no command
# nocommand

# Error by exit 1 of a script
# ./trap_error.sh

echo 'End script'
