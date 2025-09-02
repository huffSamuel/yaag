package openapi

type Reference struct {
	Ref         string  `json:"$ref"`
	Summary     *string `json:"summary"`
	Description *string `json:"description"`
}

func (r Reference) Resolve(s OpenApi) error {
	return nil
}
