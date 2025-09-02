package codegen

import (
	"fmt"

	"github.com/huffsamuel/gag/internal/openapi"
)

func GenerateContent(operation string, serialization string, code string, schema openapi.Schema) Element {
	e := NewElement()

	e.Name = responseTypeName(operation, serialization, code)

	return e
}

func responseTypeName(operation string, code string, serialization string) string {
	return fmt.Sprintf("%s%s%sResponse", operation, code, serialization)
}
