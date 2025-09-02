package openapi

type OpenApi struct {
	Openapi           string                            `json:"openapi"`
	Info              Info                              `json:"info"`
	JsonSchemaDialect *string                           `json:"jsonSchemaDialect"`
	Servers           *[]Server                         `json:"servers"`
	Paths             *Paths                            `json:"paths"`
	Webhooks          *map[string]ReferenceOr[PathItem] `json:"webhooks"`
	Components        *Components                       `json:"components"`
	Security          *[]SecurityRequirement            `json:"security"`
	Tags              *[]Tag                            `json:"tags"`
	ExternalDocs      *ExternalDocumentation            `json:"externalDocs"`
}
