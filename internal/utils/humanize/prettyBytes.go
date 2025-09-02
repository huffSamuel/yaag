package humanize

import (
	"fmt"
	"math"
)

var units = []string{
	"bytes",
	"kB",
	"MB",
	"GB",
}

const s = 1024

func PrettyBytes(b int) string {
	if b == 0 {
		return "0 bytes"
	}

	i := math.Floor(math.Log10(float64(b)) / math.Log10(s))

	i = math.Min(i, float64(len(units)-1))

	s := float64(b) / math.Pow(s, i)
	u := units[int(i)]
	return fmt.Sprintf("%.2f %s", s, u)
}
