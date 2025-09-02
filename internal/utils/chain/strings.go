package chain

import (
	"strings"

	chain_functions "github.com/huffsamuel/gag/internal/utils/chain/functions"
)

type StringChain interface {
	Join(separator string) string

	Slice(i int64) StringChain
	Map(fn func(string) string) StringChain
}

func NewStringChain(s []string) StringChain {
	return stringChain{
		Value: s,
	}
}

type stringChain struct {
	Value []string
}

func (sc stringChain) Join(s string) string {
	return strings.Join(sc.Value, s)
}

func (sc stringChain) Map(fn func(s string) string) StringChain {
	sc.Value = chain_functions.Map(sc.Value, fn)

	return sc
}

func (sc stringChain) Slice(i int64) StringChain {
	sc.Value = sc.Value[i:]

	return sc
}
