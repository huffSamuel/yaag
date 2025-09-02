package openapi

type MediaType struct {
	Schema   *Schema              `json:"schema"`
	Example  *any                 `json:"example"`
	Examples *map[string]any      `json:"examples"`
	Encoding *map[string]Encoding `json:"encoding"`
}
