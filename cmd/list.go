package cmd

import (
	"context"
	"fmt"

	cg "github.com/huffsamuel/gag/internal/codegen/languages"
	"github.com/urfave/cli/v3"
)

func ListAction(ctx context.Context, cmd *cli.Command) error {
	gs := cg.LanguageGenerators()

	fmt.Println("Generators\n----------")

	for _, g := range gs {
		fmt.Printf("%s\n", g)
	}

	return nil
}

type GeneratorOption struct {
	Name string
}
