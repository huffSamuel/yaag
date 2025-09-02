package openapi

type Header struct {
	Description     *string                          `json:"description"`
	Required        *bool                            `json:"required"`
	Deprecated      *bool                            `json:"deprecated"`
	AllowEmptyValue *bool                            `json:"allowEmptyValue"`
	Style           *string                          `json:"style"`
	Explode         *bool                            `json:"explode"`
	AllowReserved   *bool                            `json:"allowReserved"`
	Schema          *Schema                          `json:"schema"`
	Example         *any                             `json:"example"`
	Examples        *map[string]ReferenceOr[Example] `json:"examples"`
	Content         *map[string]MediaType            `json:"content"`
}
