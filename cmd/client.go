package cmd

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"slices"

	"github.com/huffsamuel/gag/internal/codegen"
	cg "github.com/huffsamuel/gag/internal/codegen/languages"
	templateengine "github.com/huffsamuel/gag/internal/codegen/templateEngine"
	openapi "github.com/huffsamuel/gag/internal/openapi"
	openapix "github.com/huffsamuel/gag/internal/openapi/x"
	"github.com/huffsamuel/gag/internal/utils/chain"
	m "github.com/huffsamuel/gag/internal/utils/maps"
	"github.com/urfave/cli/v3"
)

type generateOptions struct {
	Out      string `json:"out"`
	In       string `json:"in"`
	Language string `json:"language"`
	DryRun   bool   `json:"dryRun"`
}

func GenerateClientAction(ctx context.Context, cmd *cli.Command) error {
	o := generateOptions{
		In:       cmd.Args().Get(0),
		Out:      cmd.String("out"),
		Language: cmd.String("language"),
		DryRun:   cmd.Bool("dry-run"),
	}

	createLogger()

	if o.DryRun {
		fmt.Println("Dry Run. No files will be written to disk.")
	}

	schema := openapi.ReadSchema(o.In)

	fw := codegen.NewFileWriter(codegen.WithDryRun(o.DryRun), codegen.WithDirectory(o.Out))
	te, _ := templateengine.NewTemplateEngine(templateengine.DefaultEngine, o.Language)
	g, _ := cg.NewLanguageGenerator(o.Language)

	for _, f := range append(g.AdditionalFiles(schema), rootGeneratedFile(g, schema)) {
		t := te.Populate(f.TemplatePath, f.Variables)
		fw.Write(codegen.RenameTemplate(f.TemplatePath), t)
	}

	return nil
}

func rootGeneratedFile(g cg.LanguageGenerator, schema openapi.OpenApi) cg.GenerateFile {
	// Expand operations into their separate tags
	ops := map[string][]openapix.OperationWithPath{}

	for k, v := range *schema.Paths {
		o := mapToOperationWithPath(k, v)

		for _, op := range o {
			if len(op.Operation.Tags) == 0 {
				ops["Default"] = append(ops["Default"], op)
			} else {
				for _, t := range op.Operation.Tags {
					ops[t] = append(ops[t], op)
				}
			}
		}
	}

	apis, nested := codegen.OperationsAndNestedTypes(g, ops)

	types := chain.Map(chain.From(slices.Concat(
		m.FlatMap(m.Filter(*(schema.Components.Schemas), notComposite), codegen.Schema(g)),
		nested,
	)), func(v codegen.Element) map[string]any {
		return v.ToMap()
	}).ToSlice()

	c := chain.From(apis)
	cm := chain.Map(c, func(v codegen.Element) map[string]any {
		m := v.ToMap()

		return m
	}).ToSlice()

	v := g.PostProcessTemplate(map[string]any{
		"types":    types,
		"apis":     cm,
		"basePath": (*schema.Servers)[0].Url,
		"version":  "0.0.0.0",
	})

	return cg.GenerateFile{
		TemplatePath: g.RootTemplate(),
		Variables:    v,
	}
}

func notComposite(k string, v openapi.Schema) bool {
	return v.OneOf == nil && v.AnyOf == nil && v.AllOf == nil
}

func mapToOperationWithPath(path string, v openapi.PathItem) []openapix.OperationWithPath {
	ops := []openapix.OperationWithPath{}

	mm := map[string]*openapi.Operation{
		http.MethodDelete:  v.Delete,
		http.MethodGet:     v.Get,
		http.MethodHead:    v.Head,
		http.MethodOptions: v.Options,
		http.MethodPatch:   v.Patch,
		http.MethodPost:    v.Post,
		http.MethodPut:     v.Put,
	}

	for mth, o := range mm {
		if o == nil {
			continue
		}

		ops = append(ops, openapix.OperationWithPath{
			Operation: o,
			Method:    mth,
			Path:      path,
			PathItem:  &v,
		})
	}

	return ops
}

type GenerateProperties struct {
	SchemaPath string
	Out        string
	Generator  string
	DryRun     bool
}

func createLogger() *slog.Logger {
	// t := time.Now().Format("2006-01-02 15:04:05")
	// f, err := os.OpenFile(fmt.Sprintf("%s.log", t), os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)

	// if err != nil {
	// 	log.Panic("Unable to create log file")
	// }

	l := slog.New(slog.NewTextHandler(io.MultiWriter(os.Stdout), nil))
	slog.SetDefault(l)
	return l
}
