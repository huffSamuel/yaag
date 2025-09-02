package codegen

import "strings"

func RenameTemplate(name string) string {
	if strings.Contains(name, "/") {
		name = strings.Join(strings.Split(name, "/")[1:], "/")
	}

	return strings.Replace(name, ".mustache", "", 1)
}
