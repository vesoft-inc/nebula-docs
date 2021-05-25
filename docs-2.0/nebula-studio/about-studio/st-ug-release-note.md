# Change Log

## v2.2.1 (2021.05.06)
- Fix
  - Fix browser compatibility issues
  - Fix the rendering problem of big int type data
  - Fix the problem that no results can be obtained when importing data    
## v2.2.0 (2021.04.23)
- Feature Enhancements:
  - Explore
    - UI revision
    - Add operation panel and right-click menu, support zoom, dragging graph, modify vertex color and other operations
    - Support some operation shortcut keys operation
    - Support quick search of related vertexes in the canvas
    - Expanded function enhancement, support multi-step query
    - Added graph algorithm query function
- Fix:
  - Console
    - Fix the problem that the MATCH return structure cannot lead to graph exploration

## v2.1.9-beta (2021.03.24)
- Fix:
  - Import
    - Support import the integer type vertex id data

## v2.1.8-beta (2021.03.01)
- Feature Enhancements:
  - Console
    - The history gql supports clearing
  - Explore
    - Optimize display of large amounts of data
    - Operation panel to add buttons to support zoom, drag and drop functions
## v2.1.7-beta (2021.03.01)
- Feature Enhancements:
  - Console
    - EXPLAIN dot parameter results support graph
## v2.1.6-beta (2021.02.22)
- Fix:
  - Fixed the inaccurate display when the number exceeds the precision
- Feature Enhancements:
  - Explore
    - Supported querying the integer type vertex id

## v2.1.5-beta (2021.01.25)
- Fix:
  - Explore
    - Fix the rendering problem caused by the change of the returned data structure

## v2.1.4-beta (2021.01.19)
- Feature Enhancements:
  - Schema
    - Supported configuring fixed string for space/tag/edge/index
  - Explore
    - When a vertex is selected, its information is fixed on the page
    - Configuration persistence for vertex/edge display


## v2.1.3-beta (2021.01.12)
- Fix:
  - Explore
    - Fixed vertices rendering problem for the undo operation
    - Limited the maximum vertices number when exploring


## v2.1.2-beta (2020.12.29)
- Feature Enhancements:
  - Explore
    - Supports exporting the returned results as pictures
    - Supports double-click to do quick exploration

## v2.1.1-beta (2020.12.23)
- Fix:
  - Import
    - Fixed incorrect parsing of CSV files
    - Fixed truncation of large files.
    
## v2.1.0-beta (2020.12.22)
- Feature Enhancements:
  - Console
    - Supports imporing subgraph with the `GET SUBGRAPH` statement
  - Import
    - Supports importing data
- Fix
  - Console
    - Fixes the sorting problem for the int/double columns
  - Explore 
    - Fixes the property display problem for vertices

## v2.0.0-alpha (2020.11.24)
- Feature Enhancements:
  - Compatible with nebula graph v2.0.0-alpha
