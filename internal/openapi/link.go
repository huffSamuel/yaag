package openapi

type Link struct {
	OperationRef *string         `json:"operationRef"`
	OperationId  *string         `json:"operationId"`
	Parameters   *map[string]any `json:"parameters"`
	RequestBody  *any            `json:"requestBody"`
	Description  *string         `json:"description"`
	Server       *Server         `json:"server"`
}
