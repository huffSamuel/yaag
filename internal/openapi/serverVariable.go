package openapi

type ServerVariable struct {
	Enum        *string `json:"enum"`
	Default     string  `json:"default"`
	Description *string `json:"description"`
}
