package configuration

func WithSourceFileExtension(extension string) ConfigurationOption {
	return func(cc *CodegenConfiguration) {
		cc.SourceFileExtension = extension
	}
}
