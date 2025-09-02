package codegen

import (
	"github.com/huffsamuel/gag/internal/codegen/languages"
	"github.com/huffsamuel/gag/internal/openapi"
)

func ParameterAndNestedTypes(g languages.LanguageGenerator) func(openapi.ReferenceOr[openapi.Parameter]) (Element, []Element) {
	return func(o openapi.ReferenceOr[openapi.Parameter]) (Element, []Element) {
		if o.Ref != nil {
			return Element{
				Name: referenceName(o.Ref.Ref),
			}, []Element{}
		}

		t, pmp := Type("", o.Object.Name, []Element{}, g)(*o.Object.Schema)

		props := Element{
			Name:       o.Object.Name,
			Type:       t,
			IsOptional: (*o.Object).IsOptional(),
			InPath:     (*o.Object).In == openapi.ParameterInPath,
			InQuery:    (*o.Object).In == openapi.ParameterInQuery,
			InHeader:   (*o.Object).In == openapi.ParameterInHeader,
			InCookie:   (*o.Object).In == openapi.ParameterInCookie,
		}

		if o.Object.Schema.Default != nil {
			props.DefaultValue = *o.Object.Schema.Default
		}

		return props, pmp
	}
}
