package templateengine

import (
	"log/slog"

	"github.com/hoisie/mustache"
)

func newMustacheTemplateEngine(templatePath string) TemplateEngine {
	return mustacheTemplateEngine{
		templatePath: templatePath,
	}
}

type mustacheTemplateEngine struct {
	templatePath string
}

func (m mustacheTemplateEngine) Populate(templatePath string, variables map[string]any) string {
	t, err := mustache.ParseFile("./files/" + m.templatePath + "/" + templatePath)

	if err != nil {
		slog.Error("Failed to open template file", "path", templatePath)
		panic(1)
	}

	return t.Render(variables)
}
