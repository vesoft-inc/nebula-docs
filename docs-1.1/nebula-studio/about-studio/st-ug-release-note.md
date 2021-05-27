# Change Log

## v1.2.7-beta (2021.02.22)
-  Fix:
  - Fixed the inaccurate display when the number exceeds the precision

## v1.2.6-beta (2021.01.19)
- Feature Enhancements:
  - Explore
    - When a vertex is selected, its information is fixed on the page
    - Configuration persistence for vertex/edge display

## v1.2.5-beta (2021.01.12)
- Fix:
  - Explore
    - Fixed vertices rendering problem for the undo operation
    - Limited the maximum vertices number when exploring


## v1.2.4-beta (2020.12.29)
- Feature Enhancements:
  - Explore
    - Supports exporting the returned results as pictures
    - Supports double-click to do quick exploration

## v1.2.3-beta (2020.12.23)
- Fix:
  - Import
    - Fixed incorrect parsing of CSV files
    - Fixed truncation of large files.

## v1.2.2-beta (2020.12.17)
- Feature Enhancements:
  - Explore
    - Supports importing dangling edges
- Fix
  - Console
    - Fixed the sorting bugs

## v1.2.1-beta (2020.11.02)
- Feature Enhancements:
  - Console
    - Supports visualization of FIND PATH
    - Supports AS clause in the Open In Explore

## v1.2.0-beta (2020.10.19)
- Feature Enhancements:
  - Support visualized schema operations
    - Support retrieving, creating, and deleting graph spaces
    - Support retrieving, creating, updating, and deleting tags in a graph space 
    - Support retrieving, creating, updating, and deleting edge types in a graph space 
    - Support retrieving, creating, and deleting indexes in a graph space 

## v1.1.1-beta (2020.8.20)
- Feature Enhancements:
  - Add the link to the Nebula Graph repo on the navigation bar 
- Fix
  - Explore 
    - Support using hash or uuid to pre-process strings to generate VIDs 
    - Fix precision of double data for the query result

## v1.1.0-beta (2020.8.18)
- Feature Enhancements:
  - Explore 
    - Support query by index
    - Support pre-processing VIDs before query by VID
  - Console 
    - Support importing the results of vertex query into the graph exploration board
- Fix:
  - Explore 
    - Fixed the display problem for boolean properties
- Optimization
  - Improve text && interaction

## v1.0.10-beta (2020.7.31)
- Feature Enhancements:
  - Explore - Add `limit` when expand
  - Console - Support exporting results in csv format.

## v1.0.9-beta (2020.7.9)

- Fix:
  - Console - Support horizontal scroll bar when returning too many columns
  - Import - Support searching when selecting files
  - Import - Support importing timestamp data type
  - Explore - Fix query stitching problem when clicking the small icon

## v1.0.8-beta (2020.7.3)

- Feature Enhancements:
  - Explore - Support edge attributes select to show
  - Console - Support show gql exec time cost

## v1.0.7-beta (2020.7.1)

- Fix:
  - Console shortest|full path show problem fix

## v1.0.6-beta (2020.6.13)

- Feature Enhancements:
  - Improve the display of Explore

## v1.0.5-beta (2020.5.29)

- Feature Enhancements:
  - Imporve the interaction of Explore
  - Support long time connection
  - Modify the hotkey conflict of selecting multiple vertices at the same time. Drag to select with shift + click
  - Improve text && interaction

## v1.0.4-beta (2020.4.23)

- Feature Enhancements:
  - Explore:
    - Support remove vertex explored
    - Support select multi edge to explore at same time
    - Support select multi select vertex by click with cmd/win key pressed down
  - Others:
    - Fix some experience bugs

## v1.0.3-beta (2020.4.15)

- New Features
  - Import - You can now deploy the Nebula Studio service on remote servers, access it and import data to it remotely. The restriction of deploying Nebula Studio on your local host has been removed.
  - Explore - You can perform BIDIRECT query in Nebula Studio and select the color schemes by steps or tags to display newly-discovered nodes.

- Breaking Changes
  - Modified the project structure to enable to be deployed remote, please update the [repo](https://github.com/vesoft-inc/nebula-web-docker) by `git pull origin master && docker-compose pull`.


## v1.0.2-beta (2020.3.31)

- New Features:
  - Visualization explore add edge attributes show && config tag fields show on graph

## v1.0.1-beta (2020.3.2)

- Feature Enhancements:
  - Support spaces select and cache when executing in Console
  - Add more lines to show in Console

## v1.0.0-beta (2020.1.16)

- New Features:
  - Console
  - Import Data
  - Visualization
- [User Manual](nebula-graph-studio-user-guide-en.md)
