package handlers

import (
	"encoding/json"
	"go.appmanch.org/commons/logging"
	"io/ioutil"
	"net/http"
	"rasoi/database"

	"rasoi/models"
)

var (
	healthCheckResponse models.HealthCheckResponse
	//genericResponse models.GenericResponse
	logger = logging.GetLogger()
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	healthCheckResponse.Message = "Server is up and running"
	healthCheckResponse.Status = http.StatusOK
	json.NewEncoder(w).Encode(healthCheckResponse)
}

func InsertData(w http.ResponseWriter, r *http.Request) {
	logger.Info("Starting Insert Data")
	reqBody, _ := ioutil.ReadAll(r.Body)
	var sellerData models.SellerData

	err := json.Unmarshal(reqBody, &sellerData)
	if err != nil {
		logger.Error(err)
	}

	response := database.InsertData(sellerData)
	if response.Status != http.StatusOK {
		// json response for error
		json.NewEncoder(w).Encode(response)
	}

	//json response in case of success
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		return
	}

}