package configuration

import "github.com/huffsamuel/gag/internal/utils"

func WithRootTemplate(path string) ConfigurationOption {
	return func(cc *CodegenConfiguration) {
		cc.RootTemplate = utils.Normalize(path)
	}
}

func WithAdditionalFiles(paths ...string) ConfigurationOption {
	return func(cc *CodegenConfiguration) {
		cc.AdditionalFiles = paths
	}
}
