package utils

import (
	"regexp"
	"strings"
)

func SplitOnPattern(pattern string, str string) []string {
	return regexp.MustCompile(pattern).Split(str, -1)
}

// Camel cases a single string
func CamelCase(s string) string {
	return strings.ToLower(string(s[0])) + s[1:]
}

func Capitalize(s string) string {
	return strings.ToUpper(string(s[0])) + s[1:]
}

func PascalCase(s string) string {
	return strings.ToUpper(string(s[0])) + s[1:]
}

func Normalize(s string) string {
	if s[0] == '/' {
		return s
	}

	return "/" + s
}
