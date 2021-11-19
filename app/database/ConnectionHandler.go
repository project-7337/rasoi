package database

import (
	"context"
	"go.appmanch.org/commons/logging"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
	client *mongo.Client
	err error
)

func GetConnection() *mongo.Client  {
	return client
}

func SetMongoConnectionPool(logger *logging.Logger) {
	// Connection URI
	const uri = "mongodb+srv://root:root@cluster0.5jmw2.mongodb.net/?retryWrites=true&w=majority"

	client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		panic(err)
	}

	logger.Info("Successfully connected and pinged.")
}
