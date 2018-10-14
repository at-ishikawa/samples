package realworld

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func newLoggingMiddleware(logger *log.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			logger.Println(map[string]interface{}{
				"uri":   r.RequestURI,
				"query": r.URL.Query(),
			})
			next.ServeHTTP(w, r)
		})
	}
}

func NewRouter(logger *log.Logger) *mux.Router {
	allRouter := mux.NewRouter()
	allRouter.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "OK")
	}).Methods(http.MethodGet)

	subRouter := allRouter.PathPrefix("").Subrouter()
	subRouter.Use(newLoggingMiddleware(logger))

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
