package realworld

import (
	"context"

	"github.com/sirupsen/logrus"
)

type contextKey int

const (
	loggerKey contextKey = iota
)

var (
	L = logrus.NewEntry(logrus.StandardLogger())
)

func NewLogger() *logrus.Logger {
	logger := logrus.New()
	logger.SetFormatter(&logrus.JSONFormatter{})
	return logger
}

func WithLogger(ctx context.Context, logger *logrus.Entry) context.Context {
	return context.WithValue(ctx, loggerKey, logger)
}

func GetLogger(ctx context.Context) *logrus.Entry {
	logger := ctx.Value(loggerKey)
	if logger == nil {
		return L
	}
	return logger.(*logrus.Entry)
}
