package codegen

import (
	"github.com/huffsamuel/gag/internal/codegen/languages"
	"github.com/huffsamuel/gag/internal/openapi"
	"github.com/huffsamuel/gag/internal/utils/chain"
)

func Schema(g languages.LanguageGenerator) func(name string, v openapi.Schema) []Element {
	return func(k string, v openapi.Schema) []Element {
		propMap := []Element{}

		isEnum := v.Enum != nil
		isObject := *v.Type == openapi.SchemaTypeObject
		isTypedef := !isEnum && !isObject
		typename := g.Classify(k)

		props := Element{
			Typename:  typename,
			IsEnum:    isEnum,
			IsObject:  isObject,
			IsTypedef: isTypedef,
		}

		props = setDescription(props, v.Description)

		if isEnum {
			props.Values = chain.Map(chain.From(*v.Enum), Enum(k, v, g)).ToSlice()
		} else if isObject {
			pms := []*Element{}

			for k, v := range *v.Properties {
				pm, pmp := mapPropertyToTemplate(typename, propMap, g)(k, v)
				propMap = pmp
				pms = append(pms, &pm)
			}

			if v.Properties != nil {
				props.Properties = pms
			}
		} else if isTypedef {
			props.Type = string(*v.Type)
		}

		propMap = append(propMap, props)

		return propMap
	}
}
