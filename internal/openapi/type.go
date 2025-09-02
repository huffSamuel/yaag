package openapi

type OpenApiType string

const (
	OpenApiTypeNull    OpenApiType = "null"
	OpenApiTypeBoolean OpenApiType = "boolean"
	OpenApiTypeObject  OpenApiType = "object"
	OpenApiTypeArray   OpenApiType = "array"
	OpenApiTypeNumber  OpenApiType = "number"
	OpenApiTypeInteger OpenApiType = "integer"
	OpenApiTypeString  OpenApiType = "string"
)
