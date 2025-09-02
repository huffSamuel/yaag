syntax: https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html#tag_12_01

cg client -l typescript
cg client -l typescript -o "./ts_client" --dry-run

Generate a client in ./out: `cg client -l typescript schema.json`
Generate a client in a specific directory: `cg client -l typescript -o "~/src/api_client" schema.json`
List available client generators `cg client --list`

### client

options:
-l, --language     The generated language files
-o, --out-dir      Output directory
--dry-run          Dry run

#### list
list client generators
