package openapi

type License struct {
	Name string `json:"name"`
	// TODO: Identifier and Url are mutually exclusive
	Identifier *string `json:"identifier"`
	Url        *string `json:"url"`
}
