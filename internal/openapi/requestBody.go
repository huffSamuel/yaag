package openapi

type RequestBody struct {
	Description *string              `json:"description"`
	Content     map[string]MediaType `json:"content"`
	Required    *bool                `json:"required"`
}
