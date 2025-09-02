package openapi

type Discriminator struct {
	PropertyName string             `json:"propertyName"`
	Mapping      *map[string]string `json:"mapping"`
}
