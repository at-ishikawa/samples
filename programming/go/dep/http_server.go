package main

import (
	"context"
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World! %s\n", r.URL.Path[1:])
	fmt.Fprintf(w, "username: %s\n", r.Context().Value("username"))
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", handler)

	username := "global user name"
	http.ListenAndServe(":8080", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		context := context.WithValue(r.Context(), "username", username)
		mux.ServeHTTP(w, r.WithContext(context))
	}))
}
