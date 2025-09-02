package main

import (
	"context"
	"log"
	"os"

	"github.com/huffsamuel/gag/cmd"
	"github.com/urfave/cli/v3"
)

func main() {

	cmd := &cli.Command{
		Name: "cg",
		Commands: []*cli.Command{
			{
				Name:    "client",
				Aliases: []string{"c"},
				Usage:   "generate a client library",
				Flags: []cli.Flag{
					&cli.StringFlag{Name: "language", Aliases: []string{"l"}, Required: true, Usage: "client generator language"},
					&cli.StringFlag{Name: "out", Aliases: []string{"o"}, TakesFile: true, Usage: "output directory", Value: "./out"},
					&cli.BoolFlag{Name: "dry-run", Usage: "dry run"},
				},
				Action: cmd.GenerateClientAction,
				// TODO: How to allow arbitrary flags?
				// TODO: If --language={something} do not show default help
				// show help specific to that generator
			},
			{
				Name:            "list",
				Aliases:         []string{"l"},
				Usage:           "list generators",
				Action:          cmd.ListAction,
				SkipFlagParsing: true,
			},
		},
	}

	if err := cmd.Run(context.Background(), os.Args); err != nil {
		log.Fatal(err)
	}
	// cs := map[string]func(){
	// 	"generate": func() {
	// 		cmd.Client()
	// 	},
	// }

	// flag.Parse()
	// cn := flag.Arg(0)

	// c, ok := cs[cn]

	// if !ok {
	// 	fmt.Printf("Unknown command %s", cn)
	// 	panic(1)
	// }

	// c()
}
