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
		logger.Info("json unmarshal error")
		logger.Error(err)
	}
	logger.Info(jsonData)
	var bdoc interface{}
	coll := client.Database("sellerData").Collection("sellerInfo")
	err = bson.Unmarshal(jsonData, &bdoc)
	if err != nil {
		logger.Info("Bson unmarshalling issue")
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
