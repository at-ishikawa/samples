//+build wireinject

package realworld

import (
	"net/http"

	"github.com/google/go-cloud/wire"
	"github.com/gorilla/mux"
)

var Container = wire.NewSet(
	NewEnv,
	NewLogger,
	NewRouter,
	NewHTTPServer,
	wire.Bind(new(http.Handler), new(mux.Router)))

func InjectHTTPServer() (HTTPServer, error) {
	wire.Build(Container)
	return HTTPServer{}, nil
}
