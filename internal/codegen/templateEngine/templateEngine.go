package templateengine

import "errors"

const DefaultEngine = "mustache"

var engineTypes = [...]string{DefaultEngine}

func GetSupportedEngines() []string {
	return engineTypes[:]
}

type TemplateEngine interface {
	Populate(templatePath string, variables map[string]any) string
}

func NewTemplateEngine(engineType string, templatePath string) (TemplateEngine, error) {
	if engineType == "mustache" {
		return newMustacheTemplateEngine(templatePath), nil
	}

	return nil, errors.New("template_engine: unknown engine type")
}
