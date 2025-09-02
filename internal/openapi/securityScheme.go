package openapi

type SecurityScheme struct {
	Type             string     `json:"type"`
	Description      *string    `json:"description"`
	Name             string     `json:"name"`
	In               string     `json:"in"`
	Scheme           string     `json:"scheme"`
	BearerFormat     *string    `json:"bearerFormat"`
	Flows            OAuthFlows `json:"flows"`
	OpenIdConnectUrl string     `json:"openIdConnectUrl"`
}
