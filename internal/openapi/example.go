package openapi

type Example struct {
	Summary       *string `json:"summary"`
	Description   *string `json:"description"`
	Value         *any    `json:"value"`
	ExternalValue *string `json:"externalValue"`
}
