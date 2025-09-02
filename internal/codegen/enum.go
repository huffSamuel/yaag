package codegen

import (
	"github.com/huffsamuel/gag/internal/codegen/languages"
	"github.com/huffsamuel/gag/internal/openapi"
)

func Enum(name string, schema openapi.Schema, g languages.LanguageGenerator) func(e any) *Element {
	isString := *schema.Type == openapi.SchemaTypeString
	isNumber := *schema.Type == openapi.SchemaTypeNumber

	// TODO: Validate enums are not mixed types

	return func(e any) *Element {
		el := NewElement()

		el.Value = e
		el.IsString = isString
		el.IsNumber = isNumber

		if isString {
			el.Name = g.Enumify(e.(string))
		} else if isNumber {
			el.Name = g.Enumify(name) + "_" + e.(string)
		}

		return &el
	}
}
