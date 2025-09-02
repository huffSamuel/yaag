package maps

func Map[A comparable, B any, C any](m map[A]B, fn func(k A, v B) C) []C {
	rs := make([]C, len(m))
	c := 0
	for k, v := range m {
		rs[c] = fn(k, v)
		c += 1
	}

	return rs
}
