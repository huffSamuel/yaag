package openapix

import "github.com/huffsamuel/gag/internal/openapi"

type OperationWithPath struct {
	Path      string
	Operation *openapi.Operation
	Method    string
	PathItem  *openapi.PathItem
}
