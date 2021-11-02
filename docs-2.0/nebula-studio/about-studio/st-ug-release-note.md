# Change Log

## v3.1.0 (2021.10.29)

- Feature enhancements:
  - Compatible with Nebula Graph v2.6.0.
  - Added the use of Helm to deploy and start Studio in the Kubernetes cluster.
  - Added GEO.
  - Explorer
    - Added the function of modifying the vertex icon.

- Fix:
  - Schema
    - Fix the problem that some operations of the tag/edge/property named after keywords will report errors.
    - Fix the problem of incomplete data types by adding date/time/datetime/int32/int16/int8.

- Compatibility:
  - Remove Studio's dependency on nebula-importer and use http-gateway to be compatible with related functions.

## v3.0.0 (2021.08.13)

- Feature enhancements:

  - Compatible with Nebula Graph v2.5.0.
  - Supported adding `COMMENT` in Space, Tag, Edge Type, Index while configuration Schema.
