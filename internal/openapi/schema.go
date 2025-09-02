package openapi

type Schema struct {
	Discriminator *Discriminator         `json:"discriminator"`
	Xml           *Xml                   `json:"xml"`
	ExternalDocs  *ExternalDocumentation `json:"externalDocs"`
	Example       *any                   `json:"example"`

	_s
}

type _s struct {
	// Core
	Schema        *string            `json:"$schema"`
	Id            *string            `json:"$id"`
	Ref           *string            `json:"$ref"`
	Defs          *map[string]Schema `json:"$defs"`
	Comment       *string            `json:"$comment"`
	DynamicAnchor *string            `json:"$dynamicAnchor"`
	DynamicRef    *string            `json:"$dynamicRef"`
	Anchor        *string            `json:"$anchor"`
	Vocabulary    *map[string]bool   `json:"$vocabulary"`

	// Applicator
	OneOf                *[]Schema          `json:"oneOf"`
	AllOf                *[]Schema          `json:"allOf"`
	AnyOf                *[]Schema          `json:"anyOf"`
	If                   *Schema            `json:"if"`
	Then                 *Schema            `json:"then"`
	Else                 *Schema            `json:"else"`
	Not                  *Schema            `json:"not"`
	Properties           *map[string]Schema `json:"properties"`
	PatternProperties    *map[string]Schema `json:"patternProperties"`
	AdditionalProperties *Schema            `json:"additionalProperties"` // Or false
	DependentSchemas     *map[string]Schema `json:"dependentSchemas"`
	PropertyNames        *Schema            `json:"propertyNames"`
	PrefixItems          *[]Schema          `json:"prefixItems"`
	Contains             *Schema            `json:"contains"`
	Items                *Schema            `json:"items"`

	// Validation
	Type              *SchemaType          `json:"type"`
	Enum              *[]any               `json:"enum"`
	Const             *any                 `json:"any"`
	MinLength         *int32               `json:"minLength"`
	MaxLength         *int32               `json:"maxLength"`
	Pattern           *string              `json:"pattern"`
	Maximum           *int32               `json:"maximum"`
	ExclusiveMaximum  *int32               `json:"exclusiveMaximum"`
	MultipleOf        *int32               `json:"multipleOf"`
	Minimum           *int32               `json:"minimum"`
	ExclusiveMinimum  *int32               `json:"exclusiveMinimum"`
	DependentRequired *map[string][]string `json:"dependentRequired"`
	MinProperties     *int32               `json:"minProperties"`
	MaxProperties     *int32               `json:"maxProperties"`
	Required          *[]string            `json:"required"`
	MinItems          *int32               `json:"minItems"`
	MaxItems          *int32               `json:"maxItems"`
	MinContains       *int32               `json:"minContains"`
	MaxContains       *int32               `json:"maxContains"`
	UniqueItems       *bool                `json:"uniqueItems"`

	// Meta Data
	Title       *string `json:"title"`
	Description *string `json:"description"`
	Default     *any    `json:"default"`
	Deprecated  *bool   `json:"deprecated"`
	Examples    *[]any  `json:"examples"`
	ReadOnly    *bool   `json:"readOnly"`
	WriteOnly   *bool   `json:"writeOnly"`

	// Unevaluated
	UnevaluatedItems      *Schema `json:"unevaluatedItems"`
	UnevaluatedProperties *Schema `json:"unevaluatedProperties"`

	// Content
	ContentEncoding  *string `json:"contentEncoding"`
	ContentMediaType *string `json:"contentMediaType"`
	ContentSchema    *Schema `json:"contentSchema"`

	// Format
	Format *string `json:"format"`
}

type SchemaType string

const (
	SchemaTypeNull    SchemaType = "null"
	SchemaTypeBoolean SchemaType = "boolean'"
	SchemaTypeObject  SchemaType = "object"
	SchemaTypeArray   SchemaType = "array"
	SchemaTypeNumber  SchemaType = "number"
	SchemaTypeString  SchemaType = "string"
)
