package handlers

import (
	"encoding/json"
	"net/http"

	"rasoi/models"
)

var (
	healthCheckResponse models.HealthCheckResponse
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	healthCheckResponse.Message = "Server is up and running"
	healthCheckResponse.Status = http.StatusOK
	json.NewEncoder(w).Encode(healthCheckResponse)
}