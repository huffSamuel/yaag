package openapi

type Encoding struct {
	ContentType   *string         `json:"contentType"`
	Headers       *map[string]any `json:"headers"`
	Style         *string         `json:"style"`
	Explode       *bool           `json:"explode"`
	AllowReserved *bool           `json:"allowReserved"`
}
