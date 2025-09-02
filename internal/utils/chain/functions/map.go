package chain_functions

func Map[T any, O any](r []T, fn func(v T) O) []O {
	rs := make([]O, len(r))
	i := 0

	for _, v := range r {
		rs[i] = fn(v)
		i += 1
	}

	return rs
}

func MMap[K comparable, K2 comparable, V any, V2 any](
	m map[K]V,
	fn func(k K, v V) (K2, V2),
) map[K2]V2 {
	rs := map[K2]V2{}

	for k, v := range m {
		k2, v2 := fn(k, v)
		rs[k2] = v2
	}

	return rs
}
