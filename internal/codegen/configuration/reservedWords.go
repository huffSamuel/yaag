package configuration

func WithReservedWords(words ...string) ConfigurationOption {
	return func(cc *CodegenConfiguration) {
		cc.ReservedWords = words
	}
}
