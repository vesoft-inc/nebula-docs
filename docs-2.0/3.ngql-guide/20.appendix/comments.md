# Comments

## Legacy version compatibility

* In Nebula Graph 1.0, four comment styles: `#`, `--`, `//`, `/* */`.
* In Nebula Graph 2.0, `--` represents an edge, and can not be used as comments.

## Examples
```ngql
nebula> # Do nothing this line
nebula> RETURN 1+1;     # This comment continues to the end of line
nebula> RETURN 1+1;     // This comment continues to the end of line
nebula> RETURN 1 /* This is an in-line comment */ + 1 == 2;
nebula> RETURN 11 +            \
/* Multiple-line comment       \
Use backslash as line break.   \
*/ 12;
```

The backslash `\` in a line indicates a line break.

## OpenCypher Compatibility

You must add a `\` at the end of every line, even in multi-line comments `\* *\`.

```openCypher
/* The openCypher style:
The following comment
spans more than
one line */
MATCH (n:label)
RETURN n
```

```ngql
/* The ngql style:    \
The following comment \
spans more than       \
one line */           \
MATCH (n:tag)             \
RETURN n
```
