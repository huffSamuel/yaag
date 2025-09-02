package openapi

type Server struct {
	Url         string                     `json:"url"`
	Description *string                    `json:"description"`
	Variables   *map[string]ServerVariable `json:"variables"`
}
