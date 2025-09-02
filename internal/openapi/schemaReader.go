package openapi

import (
	"encoding/json"
	"log"
	"os"
)

func ReadSchema(path string) OpenApi {
	b, _ := os.ReadFile(path)
	s := &OpenApi{}
	if e := json.Unmarshal(b, s); e != nil {
		log.Fatal("Unable to unmarshal JSON as OpenAPI format")
	}

	return *s
}
