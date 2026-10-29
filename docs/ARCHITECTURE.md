# CARSHERS architecture

## Product surfaces

1. Customer Android app: customer profile, vehicles, service catalogue, address, slot selection, booking history, status and reviews.
2. Employee Android app: assigned jobs, job details, navigation hand-off, checklist, before/after evidence, status updates and issue reporting.
3. CRM and public website: booking queue, assignments, service packages, service areas, customers, complaints, finance reports and website content.
4. FastAPI API: the authoritative business rules and authorization layer.
5. PostgreSQL: shared persistent source of truth after database integration.

## Rules

- All clients use one API and one database.
- Never trust a price, role, booking status, or employee ID supplied by a client without server-side validation.
- Customer access is scoped to their own records.
- Employee access is scoped to assigned jobs and minimum required customer details.
- Only authorized operations roles can assign jobs or change service pricing.
- Payment status must be recorded separately from job completion.
- Keep an audit trail for booking status transitions, assignments, refunds, and administrative changes.

## Initial booking lifecycle

`requested → confirmed → assigned → en_route → in_progress → completed`

Cancellation and rescheduling should be modeled explicitly, with allowed transitions enforced by the API. A completed job must not imply payment has been settled.
