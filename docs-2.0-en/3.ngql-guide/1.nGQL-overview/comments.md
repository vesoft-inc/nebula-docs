# Comments

This topic will describe the comments in nGQL.

!!! compatibility "Legacy version compatibility"

    * In NebulaGraph 1.x, there are four comment styles: `#`, `--`, `//`, `/* */`.
    * Since NebulaGraph 2.x, `--` cannot be used as comments.

## Examples

```ngql
nebula> RETURN 1+1;     # This comment continues to the end of this line.
nebula> RETURN 1+1;     // This comment continues to the end of this line.
nebula> RETURN 1 /* This is an in-line comment. */ + 1 == 2;
nebula> RETURN 11 +            \
/* Multi-line comment.       \
Use a backslash as a line break.   \
*/ 12;
```

!!! note

    - In nGQL statements, the backslash `\` in a line indicates a line break.
    - If a statement starts with `#` or `//`, the statement is not executed and the error `StatementEmpty` is returned.

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
