#! /bin/bash

if [ "$1" = "" ]; then
    gcloud beta emulators pubsub start
else
    gcloud beta emulators pubsub $@
fi
