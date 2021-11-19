package database

import (
	"context"
	"encoding/json"
	"go.appmanch.org/commons/logging"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"rasoi/models"
)

var (
	logger = logging.GetLogger()
	genericResponse models.GenericResponse
)

func InsertData(data models.SellerData) *models.GenericResponse {
	logger.Info("Insert Data Func")
	jsonData, err := json.Marshal(data)
	if err != nil {
		logger.Error(err)
	}
	var bdoc interface{}
	coll := client.Database("db01").Collection("cl01")
	err = bson.Unmarshal(jsonData, &bdoc)
	if err != nil {
		logger.Error(err)
	}

	result, err := coll.InsertOne(context.TODO(), &bdoc)
	if err != nil {
		genericResponse.Message="Data Insert Failed"
		genericResponse.Status=http.StatusInternalServerError
		logger.Info(genericResponse)
		return &genericResponse
	}
	genericResponse.Message="Data Inserted Successfully"
	genericResponse.Id=result.InsertedID
	genericResponse.Status=http.StatusOK
	logger.Info(genericResponse)
	return &genericResponse
}
