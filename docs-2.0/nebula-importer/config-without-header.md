# Configuration without Header

For CSV files without header, you need to set `withHeader` to `false` in the configuration file, indicating that the CSV file contains only data (excluding the header of the first row). You may also need to set the data type and corresponding columns.

## Sample files

The following is an example of a CSV file without header:

- sample of vertex

  Example data for `student_without_header.csv`:

  ```csv
  student100,Monica,16,female
  student101,Mike,18,male
  student102,Jane,17,female
  ```

  The first column is the vertex ID, followed by the properties `name`, `age`, and `gender`.

- sample of edge

  Example data for `follow_without_header.csv`:

  ```csv
  student100,student101,0,92.5
  student101,student100,1,85.6
  student101,student102,2,93.2
  student100,student102,1,96.2
  ```

  The first two columns are the start vertex ID and destination vertex ID, respectively. The third column is rank, and the fourth column is property `degree`.

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
  - path: ./student_without_header.csv

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
      withHeader: false

      # Whether there is a LABEL.
      withLabel: false

      # Specifies the delimiter for the CSV file. A string delimiter that supports only one character.
      delimiter: ","

    schema:
      # Schema type. Possible values are vertex and edge.
      type: vertex

      vertex:
        
        # Vertex ID Settings.
        vid:
           # The vertex ID corresponds to the column number in the CSV file. Columns in the CSV file are numbered from 0.
           index: 0

           # The data type of the vertex ID. The optional values are int and string, corresponding to INT64 and FIXED_STRING in the Nebula Graph, respectively.
           type: string

        # Tag Settings.
            # Tag name.
          - name: student
           
            # property Settings in the Tag.
            props:
                # property name.
              - name: name
                
                # Property data type.
                type: string

                # Property corresponds to the sequence number of the column in the CSV file.
                index: 1

              - name: age
                type: int
                index: 2
              - name: gender
                type: string
                index: 3

    # The second data file in this example is edge data.
  - path: ./follow_without_header.csv
    failDataPath: ./err/followerr.csv
    batchSize: 10
    limit: 10
    inOrder: true
    type: csv
    csv:
      withHeader: false
      withLabel: false
    schema:
      # The type of Schema is edge.
      type: edge
      edge:
        # Edge type name.
        name: follow

        # Whether to include rank.
        withRanking: true

        # Start vertex ID setting.
        srcVID:
           # Data type.
           type: string

           # The start vertex ID corresponds to the sequence number of a column in the CSV file.
           index: 0

        # Destination vertex ID.
        dstVID:
           type: string
           index: 1

        # rank setting.
        rank:
           # Rank Indicates the rank number of a column in the CSV file. If index is not set, be sure to set the rank value in the third column. Subsequent columns set each property in turn.
           index: 2
        
        # Edge Type property Settings.
        props:
             # property name.
           - name: degree
             
             # Data type.
             type: double

             # Property corresponds to the sequence number of the column in the CSV file.
             index: 3
```

!!! Note

    - The sequence numbers of the columns in the CSV file start from 0, that is, the sequence numbers of the first column are 0, and the sequence numbers of the second column are 1.

    - The data type of the vertex ID must be the same as the data type of the statement in `clientSettings.postStart.commands` that creates the graph space.

    - If the index field is not specified, the CSV file must comply with the following rules:

      + In the vertex data file, the first column must be the vertex ID, followed by the properties, and must correspond to the order in the configuration file.

      + In the side data file, the first column must be the start vertex ID, the second column must be the destination vertex ID, if `withRanking` is `true`, the third column must be the rank value, and the following columns must be properties, and must correspond to the order in the configuration file.
