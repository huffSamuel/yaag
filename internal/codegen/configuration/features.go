package configuration

func WithFeature(feature string) ConfigurationOption {
	return func(cc *CodegenConfiguration) {
		cc.Features = append(cc.Features, feature)
	}
}
