---
applyTo: "src/utils/**/*.ts,src/lib/**/*.ts"
description: "Rules for utility and domain logic files"
---

- Keep functions pure where possible
- Separate raw inputs from derived outputs
- Add small guard clauses for invalid input
- Avoid UI concerns in utility files
- Keep scoring and chart transformation logic independent
