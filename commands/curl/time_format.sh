#! /bin/bash

date +"%Y/%m/%d %H:%M:%S"
curl -w "@time_format.txt" -o /dev/null -s "https://www.google.co.jp/"
date +"%Y/%m/%d %H:%M:%S"
