package realworld

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

func newLoggingMiddleware(logger *logrus.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := WithLogger(r.Context(), logger.WithFields(logrus.Fields{
				"uri":   r.RequestURI,
				"query": r.URL.Query(),
			}))
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func NewRouter(logger *logrus.Logger, userHandler UserHandler) *mux.Router {
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

	subRouter.HandleFunc("/user/{id:[0-9]+}", userHandler.GetUser).Methods(http.MethodGet)

	return allRouter
}
