package languages

import (
	"errors"

	"github.com/huffsamuel/gag/internal/openapi"
	m "github.com/huffsamuel/gag/internal/utils/maps"
)

var generators = map[string]func() LanguageGenerator{
	"typescript":         NewTypescriptGenerator,
	"typescript-angular": NewTypescriptAngularGenerator,
}

// TODO: Name, description
func LanguageGenerators() []string {
	return m.Map(generators, func(k string, v func() LanguageGenerator) string {
		return k
	})
}

type GenerateFile struct {
	TemplatePath string
	Variables    map[string]any
}

type LanguageGenerator interface {
	RootTemplate() string

	SourceCodeExtension() string

	// Return [name] as a valid class name in the target language.
	Classify(name string) string

	// Return [name] as a valid function name in the target language.
	Funcify(name string) string

	// Return [name] as a valid enum value name in the target language.
	Enumify(name string) string

	// Return [name] as a valid property name in the target language.
	Propify(name string) string

	Type(schema openapi.Schema) string

	// Type and format
	// Needs to modify source and include imports if the type is not a primitive
	// It may be best to retain a Context property internal to the generator
	// So it can have knowledge of previous actions without re-checking the schema
	// for key properties

	// TODO: postprocess for other source files, lock files, etc
	AdditionalFiles(schema openapi.OpenApi) []GenerateFile

	PostProcessTemplate(map[string]any) map[string]any
}

func NewLanguageGenerator(name string) (LanguageGenerator, error) {
	g, ok := generators[name]

	if !ok {
		return nil, errors.New("no_generator")
	}

	return g(), nil
}
