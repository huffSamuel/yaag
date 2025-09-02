package maps

func Filter[K comparable, A any](s map[K]A, fn func(K, A) bool) map[K]A {
	b := map[K]A{}

	for k, v := range s {
		if !fn(k, v) {
			continue
		}
		b[k] = v
	}

	return b
}
