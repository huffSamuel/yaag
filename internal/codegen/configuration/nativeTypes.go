package configuration

func WithNativeTypes(types ...string) ConfigurationOption {
	return func(cc *CodegenConfiguration) {
		cc.NativeTypes = types
	}
}
