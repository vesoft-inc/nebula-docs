# Nebula Bench

Nebula Bench is a performance test tool for Nebula Graph using the LDBC data set.

## Scenario

- Generate test data and import Nebula Graph.

- Performance testing in the Nebula Graph cluster.

## Test process

1. Generate test data by using ldbc_snb_datagen.

2. Import data to Nebula Graph by using the Importer.

3. Performance testing by using K6 with the XK6-Nebula plug-in.

For detailed usage instructions, see [Nebula Bench](https://github.com/vesoft-inc/nebula-bench/blob/{{bench.branch}}/README.md).
