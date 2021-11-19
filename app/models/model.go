package models

type HealthCheckResponse struct {
	Message string
	Status  int
}

type SellerData struct {
	SName string `json:"SName"`
	SAge int `json:"SAge"`
	SGender string `json:"SGender"`
	SAddress string `json:"SAddress"`
	SMobile int64 `json:"SMobile"`
	SEmailId string `json:"SEmailId"`
}

type GenericResponse struct {
	Id interface{}
	Message string
	Status int
}
