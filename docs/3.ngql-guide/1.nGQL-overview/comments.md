# Comments

This topic will describe the comments in nGQL.

## Legacy version compatibility

* In Nebula Graph 1.x, there are four comment styles: `#`, `--`, `//`, `/* */`.
* In Nebula Graph 2.x, `--` cannot be used as comments.

## Examples

```ngql
nebula> # Do nothing in this line
nebula> RETURN 1+1;     # This comment continues to the end of this line.
nebula> RETURN 1+1;     // This comment continues to the end of this line.
nebula> RETURN 1 /* This is an in-line comment. */ + 1 == 2;
nebula> RETURN 11 +            \
/* Multi-line comment.       \
Use a backslash as a line break.   \
*/ 12;
```

In nGQL statement, the backslash `\` in a line indicates a line break.

## OpenCypher compatibility

* In nGQL, you must add a `\` at the end of every line, even in multi-line comments `/* */`.
* In openCypher, there is no need to use a `\` as a line break.

```openCypher
/* openCypher style:
The following comment
spans more than
one line */
MATCH (n:label)
RETURN n;
```

```ngql
/* nGQL style:  \
The following comment       \
spans more than     \
one line */       \
MATCH (n:tag) \
RETURN n;
```
