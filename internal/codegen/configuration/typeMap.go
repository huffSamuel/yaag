package configuration

func WithTypeMap(typeMap map[string]string) ConfigurationOption {
	return func(cc *CodegenConfiguration) {
		cc.TypeMap = typeMap
	}
}
