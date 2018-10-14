package realworld

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
)

type HTTPServer struct {
	logger *log.Logger
	env    Env
	server http.Server
}

func NewHTTPServer(logger *log.Logger, env Env, router *mux.Router) HTTPServer {
	return HTTPServer{
		logger: logger,
		env:    env,
		server: http.Server{
			Addr:    fmt.Sprintf("%s:%d", env.Host, env.Port),
			Handler: router,
		},
	}
}

func (s HTTPServer) Run() {
	go func() {
		s.logger.Println("Start a server...")
		if err := s.server.ListenAndServe(); err != nil {
			s.logger.Fatalf("%#v", err)
		}
	}()

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	<-ch

	ctx := context.Background()
	s.shutdown(ctx, 30*time.Second)
	s.logger.Println("shutting down")
}

func (s HTTPServer) shutdown(ctx context.Context, timeout time.Duration) {
	ctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	if err := s.server.Shutdown(ctx); err != nil {
		s.logger.Printf("%#v", err)
	}
}
