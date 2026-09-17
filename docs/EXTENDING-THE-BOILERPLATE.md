# Extending the boilerplate

The default answer to "could this be reusable?" is **not yet**.

Promote a new pattern only when:

1. a real extension needs it;
2. Pi or a maintained external package does not already solve it well;
3. the implementation is stable enough to describe deterministically;
4. another extension would reasonably reuse the same contract, or the need is clearly infrastructure-level;
5. adding it reduces total work rather than creating another subsystem to maintain.

## Promotion flow

```text
real extension requirement
        ↓
research existing solutions
        ↓
small local implementation if still needed
        ↓
validate in the real extension
        ↓
reuse demonstrated?
   no -> stays local
   yes -> promote the smallest stable pattern
```

When promoted, update the generator only if generation itself removes repeated deterministic wiring. Update AIContext so future agents discover the pattern before attempting a replacement.
