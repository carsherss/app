# ADR 0001: Monorepo

## Context
Two mobile apps, CRM and API share coordinated development.

## Decision
Keep `github.com/carsherss/app` as the monorepo. Preserve `apps/api`, `apps/crm`, and existing architecture docs. Do not relocate API in v0.1.1.

## Consequences
Use app-specific workflow path filters. Future extraction needs a new ADR.
