package chain_functions

func Any[T any](r []T, fn func(v T) bool) bool {
	for _, v := range r {
		if fn(v) {
			return true
		}
	}

	return false
}
