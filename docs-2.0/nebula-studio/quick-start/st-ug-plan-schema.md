# Design a schema

To manipulate graph data in NebulaGraph with Studio, you must have a graph schema. This article introduces how to design a graph schema for NebulaGraph.

A graph schema for NebulaGraph must have these essential elements:

- Tags (namely vertex types) and their properties.

- Edge types and their properties

In this article, the [Social Network: MOOC User Action Dataset](https://snap.stanford.edu/data/act-mooc.html "Click to go to Stanford Network Analysis Platform (SNAP) website") and 97 distinct course names are used to introduce how to design a schema.

This table gives all the essential elements of the schema.

| Element  | Name  | Property name (Data type)  |  Description  |
| :---  | :---  | :---  | :---  |
| Tag  | **user**  | No property. | Represents users of the specified MOOC platform. The `userId` values are used as VIDs of user vertices.  |
| Tag  | **course** | `courseId` (`int`).  | Represents the courses on the specified MOOC platform. The `courseName` values are used as the VIDs of the course vertices. |
| Edge type | **action**  | - `actionId` (`int`) <br /> - `duration` (`double`): Represents the duration of an action measured in seconds from the beginning. Its values are equal to the `timestamp` values in the data source.  <br /> - `label` (`bool`): Represents whether a user drops out after an action. `TRUE` indicates a drop-out action, `FALSE` otherwise. <br /> - `feature0` (`double`) <br /> - `feature1` (`double`) <br /> - `feature2` (`double`) <br /> - `feature3` (`double`) |  Represents actions taken by users on the specified MOOC platform. An action links a user and a course and the direction is from a user to a course. It has four features.   |

This figure shows the relationship (**action**) between a **user** and a **course** on the MOOC platform.

![Users take actions on a MOOC platform](../figs/st-ug-006.png "Relationship between users and courses in the example dataset")
