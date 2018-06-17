#! /bin/bash

trap "echo 'kill child processes'; pkill -P $$; jobs" 0

sleep 10000 &
{ while true; do echo "loop"; sleep 1; done } &
jobs
