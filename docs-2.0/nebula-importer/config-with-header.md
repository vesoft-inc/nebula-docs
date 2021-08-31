# Configuration with Header

For a CSV file with header, you need to set `withHeader` to `true` in the configuration file, indicating that the first behavior in the CSV file is the header. The header content has special meanings.

!!! caution

    If the CSV file contains headers, the Importer will parse the Schema of each row of data according to the headers and ignore the vertex or edge settings in the YAML file.

## Sample files

The following is an example of a CSV file with header:

- sample of vertex

  Example data for `student_with_header.csv`:

  ```csv
  :VID(string),student.name:string,student.age:int,student.gender:string
  student100,Monica,16,female
  student101,Mike,18,male
  student102,Jane,17,female
  ```

  The first column is the vertex ID, followed by the properties `name`, `age`, and `gender`.

- sample of edge

  Example data for `follow_with_header.csv`:

  ```csv
  :SRC_VID(string),:DST_VID(string),:RANK,follow.degree:double
  student100,student101,0,92.5
  student101,student100,1,85.6
  student101,student102,2,93.2
  student100,student102,1,96.2
  ```

  The first two columns are the start vertex ID and destination vertex ID, respectively. The third column is rank, and the fourth column is property `degree`.

## Header format description

The header defines the start vertex, the destination vertex, the rank, and some special functions by keywords as follows:

- `:VID`(mandatory): Vertex ID. Need to use `:VID(type)` form to set data type, for example `:VID(string)` or `:VID(int)`.

- `:SRC_VID`(mandatory): The start vertex ID of the edge. The data type needs to be set in the form `:SRC_VID(type)`.

- `:DST_VID`(mandatory): The destination vertex ID of the edge. The data type needs to be set in the form `:DST_VID(type)`.

- `:RANK`(optional): The rank value of the edge.

- `:IGNORE`(optional): Ignore this column when inserting data.

- `:LABEL`(optional): Insert (+) or delete (-) the row. Must be column 1. For example:

  ```csv
  :LABEL,
  +,
  -,
  ```

!!! note
    All columns except the `:LABEL` column can be sorted in any order, so for larger CSV files, the user has the flexibility to set the header to select the desired column.

For Tag or Edge type properties, the format is `<tag_name/edge_name>.<prop_name>:<prop_type>`, described as follows:

- `<tag_name/edge_name>`: Tag or Edge type name.

- `<prop_name>`: property name.

- `<prop_type>`: property type. Support `bool`, `int`, `float`, `double`, `timestamp` and `string`, default `string`.

Such as `student.name:string`、`follow.degree:double`.

## Sample configuration

```yaml
# Connected to the Nebula Graph version, set to v2 when connected to 2.x.
version: v2

description: example

# Whether to delete temporarily generated logs and error data files.
removeTempFiles: false

clientSettings:

  # Retry times of nGQL statement execution failures.
  retry: 3

  # Number of Nebula Graph client concurrency.
  concurrency: 10 

  # Cache queue size per Nebula Graph client.
  channelBufferSize: 128

  # Specifies the Nebula Graph space to import the data into.
  space: student

  # Connection information.
  connection:
    user: root
    password: nebula
    address: 192.168.*.13:9669

  postStart:
    # Configure some of the operations to perform after connecting to the Nebula Graph server, and before inserting data.
    commands: |
      DROP SPACE IF EXISTS student;
      CREATE SPACE IF NOT EXISTS student(partition_num=5, replica_factor=1, vid_type=FIXED_STRING(20));
      USE student;
      CREATE TAG student(name string, age int,gender string);
      CREATE EDGE follow(degree int);

    # The interval between the execution of the above command and the execution of the insert data command.
    afterPeriod: 15s
  
  preStop:
    # Configure some of the actions you performed before disconnecting from the Nebula Graph server.
    commands: |

# Path of the error log file.
logPath: ./err/test.log

# CSV file Settings.
files:
  
    # Path for storing data files. If a relative path is used, the path is merged with the current configuration file directory. The first data file in this example is vertex data.
  - path: ./student_with_header.csv

    # Insert the failed data file storage path, so that data can be written later.
    failDataPath: ./err/studenterr.csv

    # The number of statements inserting data in a batch.
    batchSize: 10

    # Limit on the number of rows of read data.
    limit: 10

    # Whether to insert rows in the file in order. If the value is set to false, the import rate decreases due to data skew.
    inOrder: true

    # File type. Currently, only CSV files are supported.
    type: csv

    csv:
      # Whether there is a header.
      withHeader: true

      # Whether there is a LABEL.
      withLabel: false

      # Specifies the delimiter for the CSV file. A string delimiter that supports only one character.
      delimiter: ","

    schema:
      # Schema type. Possible values are vertex and edge.
      type: vertex

    # The second data file in this example is edge data.
  - path: ./follow_with_header.csv
    failDataPath: ./err/followerr.csv
    batchSize: 10
    limit: 10
    inOrder: true
    type: csv
    csv:
      withHeader: true
      withLabel: false
    schema:
      # The type of Schema is edge.
      type: edge
      edge:
        # Edge type name.
        name: follow

        # Whether to include rank.
        withRanking: true
```

!!! Note

    The data type of the vertex ID must be the same as the data type of the statement in `clientSettings.postStart.commands` that creates the graph space.