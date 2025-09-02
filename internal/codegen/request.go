package codegen

import (
	"fmt"

	"github.com/huffsamuel/gag/internal/codegen/languages"
	"github.com/huffsamuel/gag/internal/openapi"
	openapix "github.com/huffsamuel/gag/internal/openapi/x"
)

func RequestTypeName(g languages.LanguageGenerator, operation *openapi.Operation) string {
	if operation.RequestBody.Object.Content["application/json"].Schema.Ref != nil {
		return referenceName(*operation.RequestBody.Object.Content["application/json"].Schema.Ref)
	}

	o := g.Classify(*operation.OperationId)
	return g.Classify(fmt.Sprintf("%s%sRequest", o, "Json"))
}

func Request(generator languages.LanguageGenerator) func(o openapix.OperationWithPath) []Element {
	return func(o openapix.OperationWithPath) []Element {
		if o.Operation.RequestBody == nil || o.Operation.RequestBody.Ref != nil {
			return []Element{}
		}

		js, ok := (o.Operation.RequestBody.Object.Content)["application/json"]

		if !ok || js.Schema.Ref != nil {
			return []Element{}
		}

		tn := RequestTypeName(generator, o.Operation)
		return Schema(generator)(tn, *js.Schema)
	}
}
