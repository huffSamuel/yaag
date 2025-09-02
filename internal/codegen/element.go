package codegen

import (
	"github.com/huffsamuel/gag/internal/utils/chain"
)

type Elements = []Element

type Element struct {
	// Standard shared properties
	Typename       string
	Type           string
	Name           string
	Description    []string
	HasDescription bool

	// Function Property Values
	IsOptional   bool
	InPath       bool
	InQuery      bool
	InHeader     bool
	InCookie     bool
	DefaultValue any

	// Object Values
	IsEnum     bool
	IsObject   bool
	IsTypedef  bool
	Properties []*Element

	// Enum value
	Value    any
	IsString bool
	IsNumber bool
	Values   []*Element

	// Operation values
	ResponseCodes []int

	//
	Path          string
	Method        string
	Operations    []*Element
	Body          *Element
	ResponseTypes []string
	Parameters    []*Element
	HasQuery      bool
	HasPath       bool

	// Catch-all for unassigned properties
	Extensions map[string]any
}

func (e Element) ToMap() map[string]any {
	v := map[string]any{
		"name":           e.Name,
		"hasDescription": e.HasDescription,
		"description":    e.Description,
		"value":          e.Value,
		"isString":       e.IsString,
		"isNumber":       e.IsNumber,
		"operations":     chain.Map(chain.From(e.Operations), dereferenceToMap).ToSlice(),
		"path":           e.Path,
		"method":         e.Method,
		"responseTypes":  e.ResponseTypes,
		"parameters":     chain.Map(chain.From(e.Parameters), dereferenceToMap).ToSlice(),
		"hasQuery":       e.HasQuery,
		"hasPath":        e.HasPath,
		"type":           e.Type,
		"optional":       e.IsOptional,
		"inPath":         e.InPath,
		"inQuery":        e.InQuery,
		"inHeader":       e.InHeader,
		"inCookie":       e.InCookie,
		"default":        e.DefaultValue,
		"typename":       e.Typename,
		"isEnum":         e.IsEnum,
		"isObject":       e.IsObject,
		"isTypedef":      e.IsTypedef,
		"enum":           chain.Map(chain.From(e.Values), dereferenceToMap).ToSlice(),
		"properties":     chain.Map(chain.From(e.Properties), dereferenceToMap).ToSlice(),
	}

	if e.Body != nil {
		v["body"] = dereferenceToMap(e.Body)
	}

	return v
}

func dereferenceToMap(t *Element) map[string]any {
	if t == nil {
		return map[string]any{}
	}

	e := *t
	return e.ToMap()
}

func NewElement() Element {
	return Element{
		Extensions: map[string]any{},
	}
}
