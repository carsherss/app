# ADR 0003: PostgreSQL (planned)

## Context
Bookings, assignments, payments and audit records need transactional persistence.

## Decision
PostgreSQL remains the planned relational database. No DB or backend implementation is part of v0.1.1.

## Consequences
Apps must not connect directly to the production database.
