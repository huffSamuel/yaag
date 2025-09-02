package languages

import (
	"fmt"
	"log/slog"
	"slices"
	"strings"

	c "github.com/huffsamuel/gag/internal/codegen/configuration"
	"github.com/huffsamuel/gag/internal/openapi"
	openapix "github.com/huffsamuel/gag/internal/openapi/x"
	"github.com/huffsamuel/gag/internal/utils"
	"github.com/huffsamuel/gag/internal/utils/chain"
)

const (
	functionNameSplitRegex string = "[-]"
)

// TODO: How do we get and populate CLI options?

func NewTypescriptConfiguration(opts ...c.ConfigurationOption) c.CodegenConfiguration {
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
		c.WithAdditionalFiles(
			"index.ts.mustache",
		),
	)

	for _, opt := range opts {
		opt(&cfg)
	}

	return cfg
}

func NewTypescriptGenerator() LanguageGenerator {
	return typescriptGenerator{
		configuration: NewTypescriptConfiguration(),
	}
}

type typescriptGenerator struct {
	configuration c.CodegenConfiguration
}

func (g typescriptGenerator) AdditionalFiles(schema openapi.OpenApi) []GenerateFile {
	gf := make([]GenerateFile, len(g.configuration.AdditionalFiles))

	for i, v := range g.configuration.AdditionalFiles {
		gf[i] = GenerateFile{
			TemplatePath: v,
			Variables:    map[string]any{},
		}
	}

	return gf
}

func (g typescriptGenerator) RootTemplate() string {
	return g.configuration.RootTemplate
}

func (g typescriptGenerator) SourceCodeExtension() string {
	return g.configuration.SourceFileExtension
}

func (g typescriptGenerator) Classify(name string) string {
	p := utils.SplitOnPattern(functionNameSplitRegex, name)
	var buf strings.Builder

	for i := 0; i < len(p); i++ {
		buf.WriteString(utils.Capitalize(p[i]))
	}

	return buf.String()
}

func (g typescriptGenerator) Enumify(name string) string {
	return strings.ToLower(name)
}

func (g typescriptGenerator) Propify(name string) string {
	return utils.CamelCase(name)
}

func (g typescriptGenerator) TypeMap() map[string]string {
	return g.configuration.TypeMap
}

func (g typescriptGenerator) Funcify(name string) string {
	p := utils.SplitOnPattern(functionNameSplitRegex, name)
	var buf strings.Builder
	buf.WriteString(p[0])

	for i := 1; i < len(p); i++ {
		buf.WriteString(utils.Capitalize(p[i]))
	}

	return buf.String()
}

func (g typescriptGenerator) Type(s openapi.Schema) string {
	t, ok := g.configuration.TypeMap[string(*s.Type)]

	if ok {
		return t
	}

	slog.Warn("Unknown type, using type 'any'", "type", *s.Type)

	return "any"
}

func (g typescriptGenerator) PostProcessTemplate(t map[string]any) map[string]any {
	return moveDefaultOperations(t)
}

func moveDefaultOperations(t map[string]any) map[string]any {
	c := chain.From(t["apis"].([]map[string]any))
	i := c.IndexOf(func(m map[string]any) bool {
		return m["name"] == "default"
	})

	if i >= 0 {
		t["operations"] = c.ElementAt(i)["operations"]
		t["apis"] = c.RemoveAt(i).ToSlice()
	}

	return t
}

func describeProperty(p openapi.ReferenceOrParameter) string {
	d := ""
	if p.Object.Description != nil {
		d = *p.Object.Description
	}

	return fmt.Sprintf("@param %s %s", p.Object.Name, d)
}

func (g typescriptGenerator) PostprocessOperation(props map[string]any, op openapix.OperationWithPath) map[string]any {

	ps := chain.Map(chain.From(openapi.AllOperationParameters(*op.PathItem, *op.Operation)), describeProperty).ToSlice()

	props["description"] = slices.Concat(props["description"].([]string), ps)

	return props
}
