package chain_functions

import "slices"

func FlatMap[A comparable, B any, C any](m map[A]B, fn func(k A, v B) []C) []C {
	rs := []C{}
	for k, v := range m {
		rs = slices.Concat(rs, fn(k, v))
	}

	return rs
}
