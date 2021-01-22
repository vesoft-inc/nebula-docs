# Graph modeling

This document gives some generic suggestions for graph modeling that are successfully applied in Nebula Graph projects. Please note that all the suggestions are generic and there can be exceptions to these rules in your specific domains.

## Model for performance

There is no perfect method to model in Nebula Graph. Graph modeling depends on the questions that you want to know from the data. Your data drives your graph model. Graph data modeling is intuitive and convenient. **DO NOT** model for convenience. Model for performance. Please note that your model can not be the right one for your business sometimes. Test your model and gradually optimize it to fit your business.

## Edges as properties

Traversal depth decreases the traversal performance. To decrease the traversal depth, use vertex properties instead of edges. For example, model a graph includes the name, age, and eye color properties. We suggest that you create a tag person, then add name, age, and eye color as its properties. You can create a new tag eye color and a new edge type has, then create an edge a person has eye color. But this modeling method decreases the traversal performance.

Multiple properties under one tag are permitted. But make sure that tags are fine-grained. For more information, see the [Granulated vertices](#granulated_vertices) section.

## Granulated vertices

In graph modeling, use the data models with a higher level of granularity. Put a set of parallel properties into one tag. That is, separate different concepts.

## Use indexes correctly

Correct use of indexes speeds up queries, but indexes reduce the write performance by 90% or more. **ONLY** use indexes when you locate vertices or edges by their properties.

## No long string properties on edges

Be careful when you create long string properties for edges. Nebula Graph supports storing such properties on edges. But note that these properties are stored both in the outgoing edges and the incoming edges. Thus be careful with the write amplification.
