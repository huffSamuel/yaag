package openapi

type Tag struct {
	Name         string                 `json:"name"`
	Description  *string                `json:"description"`
	ExternalDocs *ExternalDocumentation `json:"externalDocs"`
}
