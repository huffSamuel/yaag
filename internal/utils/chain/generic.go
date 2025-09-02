package chain

import (
	"slices"

	chain_functions "github.com/huffsamuel/gag/internal/utils/chain/functions"
)

type GenericChain[T any] interface {
	All(fn func(v T) bool) bool
	Any(fn func(v T) bool) bool

	Concat(v []T) GenericChain[T]

	Map(fn func(v T) T) GenericChain[T]
	Filter(fn func(v T) bool) GenericChain[T]
	Slice(i int64) GenericChain[T]
	RemoveAt(i int) GenericChain[T]

	First(func(v T) bool) (*T, bool)
	IndexOf(func(v T) bool) int
	ElementAt(int) T
	ToSlice() []T
}

type sliceChain[T any] struct {
	Value []T
}

func From[T any](s []T) GenericChain[T] {
	return sliceChain[T]{
		Value: s,
	}
}

func (s sliceChain[T]) RemoveAt(i int) GenericChain[T] {
	s.Value = slices.Delete(s.Value, i, i+1)

	return s
}

func (s sliceChain[T]) ElementAt(i int) T {
	return s.Value[i]
}

func (s sliceChain[T]) IndexOf(fn func(v T) bool) int {
	for i, v := range s.Value {
		if fn(v) {
			return i
		}
	}

	return -1
}

func (s sliceChain[T]) First(fn func(v T) bool) (*T, bool) {
	for _, v := range s.Value {
		if fn(v) {
			return &v, true
		}
	}

	return nil, false
}

func (s sliceChain[T]) Concat(v []T) GenericChain[T] {
	s.Value = slices.Concat(s.Value, v)

	return s
}

func (s sliceChain[T]) Slice(i int64) GenericChain[T] {
	s.Value = s.Value[i:]

	return s
}

func (s sliceChain[T]) ToSlice() []T {
	return s.Value
}

func (s sliceChain[T]) Map(fn func(v T) T) GenericChain[T] {
	s.Value = chain_functions.Map(s.Value, fn)

	return s
}

func Map[T any, O any](s GenericChain[T], fn func(v T) O) GenericChain[O] {
	c := s.(sliceChain[T])

	return From(chain_functions.Map(c.Value, fn))
}

func (s sliceChain[T]) All(fn func(v T) bool) bool {
	return chain_functions.All(s.Value, fn)
}

func (s sliceChain[T]) Any(fn func(v T) bool) bool {
	return chain_functions.Any(s.Value, fn)
}

func (s sliceChain[T]) Filter(fn func(v T) bool) GenericChain[T] {
	s.Value = chain_functions.Filter(s.Value, fn)

	return s
}
