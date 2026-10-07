---
applyTo: "src/**/*.ts,src/**/*.tsx"
description: "Rules for React and TypeScript application code"
---

## TypeScript

- Prefer explicit types for exported functions, props, and shared objects
- Keep unions and domain models centralized in src/types
- Avoid any unless absolutely necessary
- Prefer readonly-friendly patterns where practical

## React

- Prefer functional components
- Keep components focused and small
- Extract repeated UI into reusable components
- Keep data shaping out of JSX when possible
- Avoid deeply nested conditional rendering

## State

- Use the simplest local state needed
- Do not introduce Zustand, Redux, or other state libraries unless requested
- Keep future persistence boundaries clear

## UI

- Semantic HTML first
- Accessible labels for interactive controls
- Keep styles muted and structured
