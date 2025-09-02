package languages

import (
	"log/slog"
	"slices"
	"strings"

	c "github.com/huffsamuel/gag/internal/codegen/configuration"
	"github.com/huffsamuel/gag/internal/openapi"
	openapix "github.com/huffsamuel/gag/internal/openapi/x"
	"github.com/huffsamuel/gag/internal/utils"
	"github.com/huffsamuel/gag/internal/utils/chain"
)

// TODO: How do we get and populate CLI options?

func NewTypescriptAngularConfiguration(opts ...c.ConfigurationOption) c.CodegenConfiguration {
	cfg := c.NewCodegenConfiguration(
		c.WithSourceFileExtension("ts"),
		c.WithNativeTypes("boolean", "number", "string", "Date", "Array", "ReadonlyArray"),
		c.WithReservedWords("break",
			"case",
			"catch",
			"class",
			"const",
			"continue",
			"debugger",
			"default",
			"delete",
			"do",
			"else",
			"enum",
			"export",
			"extends",
			"false",
			"finally",
			"for",
			"function",
			"if",
			"import",
			"in",
			"instanceof",
			"new",
			"null",
			"return",
			"super",
			"switch",
			"this",
			"throw",
			"true",
			"try",
			"typeof",
			"var",
			"void",
			"while",
			"with",
			"as",
			"implements",
			"interface",
			"let",
			"package",
			"private",
			"protected",
			"public",
			"static",
			"yield",
			"any",
			"boolean",
			"constructor",
			"declare",
			"get",
			"module",
			"require",
			"number",
			"set",
			"string",
			"symbol",
			"type",
			"from",
			"of",
		),
		c.WithTypeMap(map[string]string{
			"string":  "string",
			"boolean": "boolean",
			"integer": "number",
		}),
		c.WithRootTemplate("client.ts.mustache"),
	)

	for _, opt := range opts {
		opt(&cfg)
	}

	return cfg
}

func NewTypescriptAngularGenerator() LanguageGenerator {
	return typescriptAngularGenerator{
		configuration: NewTypescriptAngularConfiguration(),
	}
}

type typescriptAngularGenerator struct {
	configuration c.CodegenConfiguration
}

func (g typescriptAngularGenerator) AdditionalFiles(schema openapi.OpenApi) []GenerateFile {
	gf := make([]GenerateFile, len(g.configuration.AdditionalFiles))

	for i, v := range g.configuration.AdditionalFiles {
		gf[i] = GenerateFile{
			TemplatePath: v,
			Variables:    map[string]any{},
		}
	}

	return gf
}

func (g typescriptAngularGenerator) RootTemplate() string {
	return g.configuration.RootTemplate
}

func (g typescriptAngularGenerator) SourceCodeExtension() string {
	return g.configuration.SourceFileExtension
}

func (g typescriptAngularGenerator) Classify(name string) string {
	p := utils.SplitOnPattern(functionNameSplitRegex, name)
	var buf strings.Builder

	for i := 0; i < len(p); i++ {
		buf.WriteString(utils.Capitalize(p[i]))
	}

	return buf.String()
}

func (g typescriptAngularGenerator) Enumify(name string) string {
	return strings.ToLower(name)
}

func (g typescriptAngularGenerator) Propify(name string) string {
	return utils.CamelCase(name)
}

func (g typescriptAngularGenerator) TypeMap() map[string]string {
	return g.configuration.TypeMap
}

func (g typescriptAngularGenerator) Funcify(name string) string {
	p := utils.SplitOnPattern(functionNameSplitRegex, name)
	var buf strings.Builder
	buf.WriteString(p[0])

	for i := 1; i < len(p); i++ {
		buf.WriteString(utils.Capitalize(p[i]))
	}

	return buf.String()
}

func (g typescriptAngularGenerator) Type(s openapi.Schema) string {
	t, ok := g.configuration.TypeMap[string(*s.Type)]

	if ok {
		return t
	}

	slog.Warn("Unknown type, using type 'any'", "type", *s.Type)

	return "any"
}

func (g typescriptAngularGenerator) PostProcessTemplate(t map[string]any) map[string]any {
	return moveDefaultOperations(t)
}

func (g typescriptAngularGenerator) PostprocessOperation(props map[string]any, op openapix.OperationWithPath) map[string]any {

	ps := chain.Map(chain.From(openapi.AllOperationParameters(*op.PathItem, *op.Operation)), describeProperty).ToSlice()

	props["description"] = slices.Concat(props["description"].([]string), ps)

	return props
}
