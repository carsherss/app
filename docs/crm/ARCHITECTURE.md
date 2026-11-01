# CRM preview architecture

## Rendering model

Next.js App Router produces a static export. All eight route entry points are fixed, and all interactive workspace behavior runs in client components. There are no dynamic route segments, route handlers, middleware, Server Actions, database connections, secrets, or server-only runtime dependencies.

## Data boundary

`lib/data/types.ts` defines the `DataSource` interface and domain types. `lib/data/demo.ts` creates a deterministic sample dataset using a seeded mulberry32 generator and a fixed business date of 2 November 2026. `lib/data/index.ts` exposes the demo source. A future API adapter can implement the same interface without coupling pages to transport details.

The sample data includes 40 customers, 12 employees, 8 services, 80 bookings and audit events. Payment state is stored separately from booking lifecycle state.

## Interaction model

Booking status changes and employee assignments update React state and append local audit events. Settings can reset the sample data. No action writes to a remote system; a full page reload restores the original sample dataset.

## Static hosting constraints

The image optimizer is disabled, assets are served from the configured base path, and metadata disables search indexing. The brand artwork is loaded from the existing `public/brand` assets and is not duplicated in this overlay archive.
