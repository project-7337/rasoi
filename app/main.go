package main

import (
	"context"
	"go.appmanch.org/commons/logging"
	"go.appmanch.org/commons/turbo"
	"net/http"
	"os"
	"os/signal"
	"rasoi/handlers"
	"syscall"
	"time"
)

var logger = logging.GetLogger()

func main() {

	logger.Info("Starting up the app server")

	router := turbo.NewRouter()
	router.Get("/ap1/v1/health", handlers.HealthCheck)

	srv := &http.Server{
		Handler:      router,
		Addr:         ":8080",
		ReadTimeout:  20 * time.Second,
		WriteTimeout: 20 * time.Second,
	}

	go func() {
		logger.Info("Server Started")
		if err := srv.ListenAndServe(); err != nil {
			logger.Error(err)
		}
	}()
	waitForShutdown(srv)
}

func waitForShutdown(srv *http.Server) {
	interruptChan := make(chan os.Signal, 1)
	signal.Notify(interruptChan, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	<-interruptChan
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	srv.Shutdown(ctx)
	logger.Info("Shutting Down")
	os.Exit(0)
}
