package codegen

import (
	"fmt"
	"os"
	"strings"

	"github.com/huffsamuel/gag/internal/options"
	utils "github.com/huffsamuel/gag/internal/utils"
	"github.com/huffsamuel/gag/internal/utils/humanize"
)

type FileWriter interface {
	Write(path string, contents string) error
}

func NewFileWriter(options ...FileWriterOption) FileWriter {
	opts := FileWriterOptions{
		dryRun: false,
	}

	for _, opt := range options {
		opt(&opts)
	}

	return fileWriter{
		options: opts,
	}
}

type FileWriterOptions struct {
	dryRun    bool
	directory string
}

type FileWriterOption = options.Option[FileWriterOptions]

type fileWriter struct {
	options FileWriterOptions
}

func WithDryRun(dryRun bool) FileWriterOption {
	return func(fwo *FileWriterOptions) {
		fwo.dryRun = dryRun
	}
}

func WithDirectory(dir string) FileWriterOption {
	return func(fwo *FileWriterOptions) {
		fwo.directory = dir
	}
}

func (f fileWriter) formatPath(p string) string {
	return strings.Join([]string{
		f.options.directory,
		utils.Normalize(p),
	}, "")
}

func (f fileWriter) Write(path string, contents string) error {
	b := []byte(contents)
	p := f.formatPath(path)
	fmt.Printf("CREATE %s %s\n", p, humanize.PrettyBytes(len(b)))

	if !f.options.dryRun {
		os.WriteFile(p, b, 0666)
	}

	return nil
}
