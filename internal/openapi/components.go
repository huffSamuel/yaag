package openapi

type Components struct {
	Schemas         *map[string]Schema                      `json:"schemas"`
	Responses       *map[string]ReferenceOr[Response]       `json:"responses"`
	Parameters      *map[string]ReferenceOr[Parameter]      `json:"parameters"`
	Examples        *map[string]ReferenceOr[Example]        `json:"examples"`
	RequestBodies   *map[string]ReferenceOr[RequestBody]    `json:"requestBodies"`
	Headers         *map[string]ReferenceOr[Header]         `json:"headers"`
	SecuritySchemes *map[string]ReferenceOr[SecurityScheme] `json:"securitySchemes"`
	Links           *map[string]ReferenceOr[Link]           `json:"links"`
	Callbacks       *map[string]ReferenceOr[Callback]       `json:"callbacks"`
	PathItems       *map[string]ReferenceOr[PathItem]       `json:"pathItems"`
}
