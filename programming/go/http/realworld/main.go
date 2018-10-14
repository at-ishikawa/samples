package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/kelseyhightower/envconfig"
)

type Env struct {
	Host string `envconfig:"host" default:"127.0.0.1"`
	Port int    `envconfig:"port" default:"8080"`
}

var env Env
var logger *log.Logger

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(map[string]interface{}{
			"uri":   r.RequestURI,
			"query": r.URL.Query(),
		})
		next.ServeHTTP(w, r)
	})
}

func newRouter() *mux.Router {
	allRouter := mux.NewRouter()
	allRouter.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "OK")
	}).Methods(http.MethodGet)

	subRouter := allRouter.PathPrefix("").Subrouter()
	subRouter.Use(loggingMiddleware)

	subRouter.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "Hello World!")
	}).Methods(http.MethodGet)

	subRouter.HandleFunc("/user/{id:[0-9]+}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "user %s", vars["id"])
	}).Methods(http.MethodGet)

	return allRouter
}

func newHTTPServer(handler http.Handler) http.Server {
	s := http.Server{
		Addr:    fmt.Sprintf("%s:%d", env.Host, env.Port),
		Handler: handler,
	}
	return s
}

func shutdownHTTPServer(ctx context.Context, s http.Server, timeout time.Duration) {
	ctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	if err := s.Shutdown(ctx); err != nil {
		logger.Printf("%#v", err)
	}
}

func startServer() int {
	logger := log.New(os.Stdout, "", 0)

	err := envconfig.Process("", &env)
	if err != nil {
		logger.Printf("failed to read environment variables, %#v", err)
		return 1
	}

	r := newRouter()
	s := newHTTPServer(r)
	go func() {
		if err := s.ListenAndServe(); err != nil {
			logger.Fatalf("%#v", err)
		}
	}()

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	<-ch

	ctx := context.Background()
	shutdownHTTPServer(ctx, s, 30*time.Second)
	logger.Println("shutting down")

	return 0
}

func main() {
	exitCode := startServer()
	os.Exit(exitCode)
}
