package codegen

import (
	"strings"
)

func referenceName(ref string) string {
	n := strings.Split(ref, "/")
	return n[len(n)-1]
}

func ref[T any]() func(T) *T {
	return func(v T) *T {
		return &v
	}
}

func notNull[T any]() func(*T) bool {
	return func(t *T) bool {
		return t != nil
	}
}

func dereferenceAll[T any](vs []*T) []T {
	vn := []T{}

	for _, v := range vs {
		vn = append(vn, *v)
	}

	return vn
}
