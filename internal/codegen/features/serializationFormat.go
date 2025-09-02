package features

type SerializationFormat string

const (
	SerializationFormatJson SerializationFormat = "JSON"
	SerializationFormatXml  SerializationFormat = "XML"
)

func WithSerializationFormats(formats ...SerializationFormat) FeatureSetOption {
	return func(fs *FeatureSet) {
		fs.SerializationFormats = formats
	}
}
