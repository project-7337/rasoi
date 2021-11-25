package models

type HealthCheckResponse struct {
	Message string
	Status  int
}

type SellerData struct {
	SName string `json:"sName"`
	SAge int `json:"sAge"`
	SGender string `json:"sGender"`
	SAddress string `json:"sAddress"`
	SMobile int64 `json:"sMobile"`
	SEmailId string `json:"sEmailId"`
}

type GenericResponse struct {
	Id interface{}
	Message string
	Status int
}
