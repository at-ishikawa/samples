package realworld

import (
	"github.com/kelseyhightower/envconfig"
	"github.com/pkg/errors"
)

type Env struct {
	Host string `envconfig:"host" default:"127.0.0.1"`
	Port int    `envconfig:"port" default:"8080"`
}

func NewEnv() (Env, error) {
	var env Env
	err := envconfig.Process("", &env)
	if err != nil {
		return env, errors.Wrap(err, "failed to read environment variables, %#v")
	}
	return env, nil
}
