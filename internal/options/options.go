package options

type Option[V any] func(*V)

func Apply[V any](v *V, opts []Option[V]) *V {
	for _, opt := range opts {
		opt(v)
	}

	return v
}
