package openapi

type ParameterIn string

const (
	ParameterInHeader ParameterIn = "header"
	ParameterInCookie ParameterIn = "cookie"
	ParameterInPath   ParameterIn = "path"
	ParameterInQuery  ParameterIn = "query"
)

type Parameter struct {
	Name            string                           `json:"name"`
	In              ParameterIn                      `json:"in"`
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

func (p Parameter) IsOptional() bool {
	return p.Required == nil || !(*p.Required)
}
