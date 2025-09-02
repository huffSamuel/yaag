package chain_map

func Dereference[T any](r *T) T {
	return *r
}
