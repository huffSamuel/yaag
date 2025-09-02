package openapi

type PathItem struct {
	Ref         *string                   `json:"$ref"`
	Summary     *string                   `json:"summary"`
	Description *string                   `json:"description"`
	Get         *Operation                `json:"get"`
	Put         *Operation                `json:"put"`
	Post        *Operation                `json:"post"`
	Delete      *Operation                `json:"delete"`
	Options     *Operation                `json:"options"`
	Head        *Operation                `json:"head"`
	Patch       *Operation                `json:"patch"`
	Trace       *Operation                `json:"trace"`
	Servers     *[]Server                 `json:"servers"`
	Parameters  *[]ReferenceOr[Parameter] `json:"parameters"`
}
