package chain

import (
	chain_functions "github.com/huffsamuel/gag/internal/utils/chain/functions"
)

type MapChain[K comparable, V any] interface {
	Filter(func(k K, v V) bool) MapChain[K, V]

	ToMap() map[K]V
}

func NewMapChain[K comparable, V any](m map[K]V) MapChain[K, V] {
	return mapChain[K, V]{
		Value: m,
	}
}

func GroupBy[V any, K comparable, O any](c GenericChain[V], fn func(V) (K, []O)) MapChain[K, []O] {
	t := map[K][]O{}

	for _, v := range c.ToSlice() {
		k, o := fn(v)
		t[k] = o
	}

	return NewMapChain(t)
}

func MFlatMap[K comparable, V any, R any](mc MapChain[K, V], fn func(k K, v V) []R) GenericChain[R] {
	return From(chain_functions.FlatMap(mc.ToMap(), fn))
}

func MMap[K comparable, K2 comparable, V any, V2 any](
	mc MapChain[K, V],
	fn func(k K, v V) (K2, V2),
) MapChain[K2, V2] {
	return NewMapChain(chain_functions.MMap(mc.ToMap(), fn))
}

type mapChain[K comparable, V any] struct {
	Value map[K]V
}

func (mc mapChain[K, V]) Filter(fn func(k K, v V) bool) MapChain[K, V] {
	mc.Value = chain_functions.MapFilter(mc.Value, fn)

	return mc
}

func (mc mapChain[K, V]) ToMap() map[K]V {
	return mc.Value
}
