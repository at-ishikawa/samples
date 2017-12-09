package main

import (
	log "github.com/sirupsen/logrus"
)

func main() {
	fields := log.Fields{
		"animal": "walrus",
	}
	log.WithFields(fields).Info("A walrus appears")
}
