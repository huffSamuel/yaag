package features

import "github.com/huffsamuel/gag/internal/options"

type FeatureSet struct {
	SerializationFormats []SerializationFormat
}

func (f *FeatureSet) Extend(opts ...FeatureSetOption) {
	for _, opt := range opts {
		opt(f)
	}
}

func NewFeatureSet(opts ...FeatureSetOption) FeatureSet {
	f := FeatureSet{}

	f.Extend(opts...)

	return f
}

type FeatureSetOption options.Option[FeatureSet]
