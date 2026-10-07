# Copilot Instructions

## Project

This repo is for The North Star, a personal growth dashboard focused on identity change over time.
It is not a generic productivity app, habit tracker, or marketing website.

## Product intent

The app should help the user compare:

- current self
- target self
- previous snapshots

The core domains are:

- career
- fitness
- hobbies
- learning
- service
- recovery
- relationships
- discipline

## MVP priorities

Build only what is needed for the MVP:

- dashboard shell
- overview
- goals
- time invested
- reflections
- snapshots
- Strava placeholder

Do not add:

- authentication
- backend services
- API integration
- routing unless requested
- state libraries unless requested
- unnecessary dependencies

## Technical rules

- Use React + TypeScript + Vite
- Keep strict typing
- Prefer small composable components
- Keep domain logic out of presentational components
- Put scoring logic in utilities
- Put chart transformation logic in chart utilities
- Preserve existing file structure unless there is a clear reason to change it

## UX rules

- Calm, reflective, structured interface
- Avoid gamification, flashy gradients, and startup-dashboard clichés
- Distinguish raw metrics from interpreted scores
- Optimize for readability and low-friction logging

## Working style

For each task:

1. Explain the plan in 3 short bullets
2. Implement only the requested scope
3. Do not rewrite unrelated files
4. Flag unclear assumptions instead of inventing them
5. Keep the build passing

## Validation

- Install: npm install
- Dev: npm run dev
- Build: npm run build
