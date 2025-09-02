package openapi

type OAuthFlows struct {
	Implicit          OAuthFlow `json:"implicit"`
	Password          OAuthFlow `json:"password"`
	ClientCredentials OAuthFlow `json:"clientCredentials"`
	AuthorizationCode OAuthFlow `json:"authorizationCode"`
}
