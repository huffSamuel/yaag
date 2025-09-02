package codegen

import (
	"github.com/huffsamuel/gag/internal/codegen/languages"
	"github.com/huffsamuel/gag/internal/openapi"
)

func mapPropertyToTemplate(typename string, propMap []Element, g languages.LanguageGenerator) func(key string, property openapi.Schema) (Element, []Element) {
	return func(key string, property openapi.Schema) (Element, []Element) {
		t, pmp := Type(typename, key, propMap, g)(property)
		p := Element{
			Name: g.Propify(key),
			Type: t,
		}

		p = setDescription(p, property.Description)

		return p, pmp
	}
}
