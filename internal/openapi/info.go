package openapi

type Info struct {
	Title          *string  `json:"title"`
	Summary        *string  `json:"summary"`
	Description    *string  `json:"description"`
	TermsOfService *string  `json:"termsOfService"`
	Contact        *Contact `json:"contact"`
	License        *License `json:"licenseObject"`
	Version        string   `json:"version"`
}
