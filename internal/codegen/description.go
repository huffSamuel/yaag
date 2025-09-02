package codegen

import (
	"strings"
)

func setDescription(element Element, description *string) Element {
	hd := description != nil
	element.HasDescription = hd

	if hd {
		element.Description = strings.Split((*description), "\n")
	}

	return element
}
