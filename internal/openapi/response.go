package openapi

type Response struct {
	Description string                `json:"description"`
	Headers     *map[string]any       `json:"headers"`
	Content     *map[string]MediaType `json:"content"`
	Links       *map[string]any       `json:"links"`
}
