package chain_functions

func Filter[T any](r []T, fn func(v T) bool) []T {
	o := []T{}

	for _, v := range r {
		if fn(v) {
			o = append(o, v)
		}
	}

	return o
}

func MapFilter[K comparable, V any](r map[K]V, fn func(k K, v V) bool) map[K]V {
	o := map[K]V{}

	for k, v := range r {
		if fn(k, v) {
			o[k] = v
		}
	}

	return o
}
