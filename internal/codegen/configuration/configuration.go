package configuration

import "github.com/huffsamuel/gag/internal/options"

type CodegenConfiguration struct {
	SourceFileExtension string
	NativeTypes         []string
	ReservedWords       []string
	TypeMap             map[string]string
	CliOptions          []any
	RootTemplate        string
	Features            []string
	AdditionalFiles     []string

	options []ConfigurationOption
}

func NewCodegenConfiguration(opts ...ConfigurationOption) CodegenConfiguration {
	c := CodegenConfiguration{
		SourceFileExtension: ".unknown",
		NativeTypes:         []string{},
		ReservedWords:       []string{},
		TypeMap:             map[string]string{},
		CliOptions:          []any{},
		Features:            make([]string, 0),
		options:             opts,
	}

	for _, opt := range opts {
		opt(&c)
	}

	return c
}

type ConfigurationOption options.Option[CodegenConfiguration]
