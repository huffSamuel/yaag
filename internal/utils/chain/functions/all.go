package chain_functions

func All[T any](r []T, fn func(v T) bool) bool {
	for _, v := range r {
		if !fn(v) {
			return false
		}
	}

	return true
}
