Using reusable references to build schema for JSON file based on type of node (behavior, participants, primitive etc).

Planning:

- Base Narrative Schema establishes node types at first level
    - In this case, that is behavior, participant and import
- Each node in body has its own schema
    - Behavior/Narrative can have specific types
    - Can't contain import etc.

I think it makes sense to establish base narrative, and initial level schemas. Then auto generated schemas will add refs to schemas for the node types that are allowed. The schema for the primitives will be generated using the vaidated primitie definitions.

So the end workflow, will produce a single schema file that will be made available using a URL. It will then be referenced to vaidate any constructed narratives.