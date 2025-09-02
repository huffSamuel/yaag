package openapi

type OAuthFlow struct {
	AuthorizationUrl string            `json:"authorizationUrl"`
	TokenUrl         string            `json:"tokenUrl"`
	RefreshUrl       *string           `json:"refreshUrl"`
	Scopes           map[string]string `json:"scopes"`
}
