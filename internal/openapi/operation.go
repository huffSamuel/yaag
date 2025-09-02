package openapi

import "slices"

type Operation struct {
	Tags         []string                          `json:"tags"`
	Summary      *string                           `json:"summary"`
	Description  *string                           `json:"description"`
	ExternalDocs *ExternalDocumentation            `json:"externalDocs"`
	OperationId  *string                           `json:"operationId"`
	Parameters   *[]ReferenceOr[Parameter]         `json:"parameters"`
	RequestBody  *ReferenceOr[RequestBody]         `json:"requestBody"`
	Responses    *Responses                        `json:"responses"`
	Callbacks    *map[string]ReferenceOr[Callback] `json:"callbacks"`
	Deprecated   *bool                             `json:"deprecated"`
	Security     *[]SecurityRequirement            `json:"security"`
	Servers      *[]Server                         `json:"servers"`
}

func AllOperationParameters(pathItem PathItem, operation Operation) []ReferenceOr[Parameter] {
	p := []ReferenceOr[Parameter]{}

	if pathItem.Parameters != nil {
		p = slices.Concat(p, *pathItem.Parameters)
	}

	if operation.Parameters != nil {
		p = slices.Concat(p, *operation.Parameters)
	}

	return p
}
