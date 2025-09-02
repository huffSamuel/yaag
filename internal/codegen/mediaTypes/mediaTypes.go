package mediatypes

import "strings"

func IsJson(mediaType string) bool {
	return strings.Contains(mediaType, "json")
}
