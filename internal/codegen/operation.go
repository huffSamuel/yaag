package codegen

import (
	"strings"

	"github.com/huffsamuel/gag/internal/codegen/languages"
	"github.com/huffsamuel/gag/internal/openapi"
	openapix "github.com/huffsamuel/gag/internal/openapi/x"
	"github.com/huffsamuel/gag/internal/utils/chain"
	m "github.com/huffsamuel/gag/internal/utils/maps"
)

func OperationsAndNestedTypes(g languages.LanguageGenerator, groupedOperations map[string][]openapix.OperationWithPath) ([]Element, []Element) {
	templates := []Element{}
	nestedTypes := [][]Element{}

	for t, ops := range groupedOperations {
		operations := []*Element{}

		for _, operation := range ops {
			operation, operationTypes := OperationAndNestedTypes(g)(operation)
			operations = append(operations, &operation)
			nestedTypes = append(nestedTypes, operationTypes)
		}

		templates = append(templates, Element{
			Name:       strings.ToLower(t),
			Operations: operations,
		})
	}

	return templates, chain.From2D(nestedTypes).Flatten().ToSlice()

}

func OperationAndNestedTypes(g languages.LanguageGenerator) func(v openapix.OperationWithPath) (Element, []Element) {
	return func(v openapix.OperationWithPath) (Element, []Element) {
		nestedTypes := [][]Element{}
		parameters := []*Element{}

		t := Element{
			Path:   v.Path,
			Method: v.Method,
			Name:   g.Funcify(*(v.Operation.OperationId)),
		}

		t = setDescription(t, v.Operation.Summary)

		for _, p := range openapi.AllOperationParameters(*v.PathItem, *v.Operation) {
			ps, pt := ParameterAndNestedTypes(g)(p)
			if len(pt) > 0 {
				nestedTypes = append(nestedTypes, pt)
			}
			parameters = append(parameters, &ps)
		}

		if v.Operation.RequestBody != nil {
			r := Request(g)(v)
			nestedTypes = append(nestedTypes, r)
			t.Body = &Element{
				Type: RequestTypeName(g, v.Operation),
			}
		}

		if v.Operation.Responses != nil {
			responses := Responses(g)(v)
			nestedTypes = append(nestedTypes, responses)

			responseTypes := m.Map(m.Filter((*v.Operation.Responses), func(code string, response openapi.ReferenceOr[openapi.Response]) bool {
				return IsValidResponse(response)
			}), func(k string, r openapi.ReferenceOr[openapi.Response]) string {
				return ResponseTypeName(g, *v.Operation, k)
			})

			t.ResponseTypes = responseTypes
		}

		t.Parameters = parameters
		t.HasQuery = chain.From(parameters).Any(func(v *Element) bool {
			return v.InQuery
		})
		t.HasPath = chain.From(parameters).Any(func(v *Element) bool {
			return v.InPath
		})

		return t, chain.From2D(nestedTypes).Flatten().ToSlice()
	}
}
