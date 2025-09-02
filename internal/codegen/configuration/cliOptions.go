package configuration

func WithCliOptions(options ...any) ConfigurationOption {
	return func(cc *CodegenConfiguration) {
		cc.CliOptions = options
	}
}
