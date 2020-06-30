# Compact

This document will walk you through the concept of Compact.

There are two types of Compact in code. One is **minor compact** (disable_auto_compactions=false). Small-scale sst files are merged when writing during the minor compact, which mainly guarantees the reading speed in a short time. The other one is **major compact** (i.e. the `SUBMIT JOB COMPACT` in **Nebula Graph**). Usually, major compact is performed in the early morning, and all sst files are merged, which mainly ensures the reading speed in the next few hours.
