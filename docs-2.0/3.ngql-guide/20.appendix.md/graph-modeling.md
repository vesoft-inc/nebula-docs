# Graph modeling

This document gives some generic suggestions for graph modeling that are successfully applied in Nebula Graph projects. Please note that all the suggestions are generic and there can be exceptions to these rules in your specific domains.

## Model for query performance

There is no perfect method to model in Nebula Graph. Graph modeling depends on the questions that you want to know from the data. Your data drives your graph model.

## Edges as properties

Too many edges increase the traversal depth, thus decreases the traversal performance. To decrease the traversal depth, model edges that can be predicted in number as properties. Rich properties under one tag are permitted. But make sure that tags are fine-grained. For more information, see the [Granulated vertices](#granulated_vertices) section.

## Granulated vertices

In graph modeling, use the data models with a higher leave of granularity. Put a set of parallel properties into one tag. That is, separate different concepts.

## Use indexes correctly

Correct use of indexes speeds up queries, but indexes reduce the write performance by 90% or more. **ONLY** use indexes when you locate vertices or edges by their properties.

## No properties on edges

Be careful when you create properties for edges. Nebula Graph supports storing properties on edges. But note that these properties are stored both in the outgoing edges and the incoming edges. Be careful with the write amplification.
