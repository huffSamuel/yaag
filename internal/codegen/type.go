package codegen

import (
	"fmt"
	"slices"

	"github.com/huffsamuel/gag/internal/codegen/languages"
	"github.com/huffsamuel/gag/internal/openapi"
)

func Type(parentTypename string, propertyName string, propMap []Element, g languages.LanguageGenerator) func(t openapi.Schema) (string, []Element) {
	return func(t openapi.Schema) (string, []Element) {
		if t.Ref != nil {
			return g.Classify(referenceName(*t.Ref)), propMap
		}

		if isComposite(t) {
			return "any", propMap
		}

		if *t.Type == openapi.SchemaTypeArray {
			t, pmp := Type(parentTypename, propertyName, propMap, g)(*t.Items)
			return fmt.Sprintf("%s[]", t), pmp
		}

		if *t.Type == openapi.SchemaTypeObject {
			tn := fmt.Sprintf("%s%s", parentTypename, g.Classify(propertyName))
			pmp := slices.Concat(propMap, Schema(g)(tn, t))

			return tn, pmp
		}

		v := g.Type(t)

		return v, propMap
	}
}

func isComposite(s openapi.Schema) bool {
	return s.AllOf != nil || s.AnyOf != nil || s.OneOf != nil
}
