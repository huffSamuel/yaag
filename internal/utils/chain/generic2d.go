package chain

import "slices"

type SliceChain2D[T any] interface {
	Flatten() GenericChain[T]
}

type sliceChain2D[T any] struct {
	Value [][]T
}

func From2D[T any](s [][]T) SliceChain2D[T] {
	return sliceChain2D[T]{
		Value: s,
	}
}

func (s sliceChain2D[T]) Flatten() GenericChain[T] {
	r := []T{}

	for _, v := range s.Value {
		r = slices.Concat(r, v)
	}

	return sliceChain[T]{
		r,
	}
}
