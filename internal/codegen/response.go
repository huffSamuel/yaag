package codegen

import (
	"fmt"

	"github.com/huffsamuel/gag/internal/codegen/languages"
	mediatypes "github.com/huffsamuel/gag/internal/codegen/mediaTypes"
	"github.com/huffsamuel/gag/internal/openapi"
	openapix "github.com/huffsamuel/gag/internal/openapi/x"
	"github.com/huffsamuel/gag/internal/utils/chain"
	m "github.com/huffsamuel/gag/internal/utils/maps"
)

func Responses(generator languages.LanguageGenerator) func(o openapix.OperationWithPath) []Element {
	return func(o openapix.OperationWithPath) []Element {
		t := m.FlatMap(*o.Operation.Responses, Response(generator, o))

		return dereferenceAll(chain.From(t).Filter(notNull[Element]()).ToSlice())
	}
}

func IsValidResponse(response openapi.ReferenceOr[openapi.Response]) bool {
	r := response.Ref

	if r != nil && r.Ref != "" {
		return true
	}

	if response.Object != nil {
		return true
	}

	return false
}

func ResponseTypeName(generator languages.LanguageGenerator, operation openapi.Operation, httpCode string) string {
	mr := (*(*operation.Responses)[httpCode].Object.Content)["application/json"].Schema.Ref
	if mr != nil {
		return referenceName(*mr)
	}

	on := generator.Classify(*(operation.OperationId))
	return fmt.Sprintf("%s%s%sResponse", on, "Json", httpCode)

}

func Response(generator languages.LanguageGenerator, o openapix.OperationWithPath) func(httpCode string, value openapi.ReferenceOr[openapi.Response]) []*Element {
	return func(httpCode string, value openapi.ReferenceOr[openapi.Response]) []*Element {
		if value.Ref != nil {
			return nil
		}

		for k, v := range *value.Object.Content {
			// TODO: && options.JsonSerialization
			if mediatypes.IsJson(k) {
				tn := ResponseTypeName(generator, *o.Operation, httpCode)
				t := Schema(generator)(tn, *v.Schema)

				return chain.Map(chain.From(t), ref[Element]()).ToSlice()
			}
		}

		return nil
	}
}
