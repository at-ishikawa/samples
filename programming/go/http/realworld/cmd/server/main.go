package main

import (
	"fmt"
	"os"

	app "github.com/at-ishikawa/samples/http/realworld"
)

func run() int {
	s, err := app.InjectHTTPServer()
	if err != nil {
		fmt.Println(err)
		return 1
	}
	s.Run()
	return 0
}

func main() {
	exitCode := run()
	os.Exit(exitCode)
}
