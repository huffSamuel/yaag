package openapi

import (
	"bytes"
	"encoding/json"
)

type ReferenceOrParameter = ReferenceOr[Parameter]

type ReferenceOr[A any] struct {
	Ref    *Reference
	Object *A
}

func (r ReferenceOr[A]) IsReference() bool {
	return r.Ref != nil
}

func (r ReferenceOr[A]) IsObject() bool {
	return r.Object != nil
}

func (r *ReferenceOr[A]) UnmarshalJSON(data []byte) error {
	ref := &Reference{}

	dec := json.NewDecoder(bytes.NewReader(data))
	dec.DisallowUnknownFields()

	err := dec.Decode(ref)

	if err == nil {
		r.Ref = ref
		return nil
	}

	var a A

	err = json.Unmarshal(data, &a)

	if err != nil {
		return err
	}

	r.Object = &a
	return nil
}
