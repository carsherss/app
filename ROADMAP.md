# CARSHERS Roadmap

Only v0.1.1 is In progress. Later milestones are Planned. Do not implement them early.

## v0.1.1 — Standalone Android APKs
**Status:** In progress
**Goal:** Two independently launchable release-variant APKs without Metro.
**Tasks:** SDK alignment; generate and commit lockfiles; Expo prebuild in CI; `assembleRelease`; bundle/signature/package/version/debuggable checks; upload APK+checksum; physical-device airplane-mode testing.
**Acceptance:** Both workflows succeed; expected JS bundle exists; apksigner succeeds; package IDs/versionCode match; APK not debuggable; both devices launch offline without Metro; checklist evidence recorded.
**Files:** `apps/customer/*`, `apps/employee/*`, app workflows, scripts and v0.1.1 docs.
**Rollback:** Revert overlay commit; preserve existing API/CRM; do not distribute failed artifacts.

## v0.2.0 — Signing and Releases
**Status:** Planned · **Goal:** protected production upload signing and tagged releases. **Tasks:** upload keystore, GitHub Secrets, signed APK/AAB, monotonic version codes, GitHub Releases. **Acceptance:** signed tagged artifacts; increasing version codes; no secret leakage. **Files:** Gradle signing config, release workflow, signing docs. **Rollback:** disable workflow, rotate compromised credentials, retain last approved artifacts.

## v0.3.0 — Backend foundation
**Status:** Planned · **Goal:** FastAPI/PostgreSQL/Alembic/auth/RBAC. **Tasks:** SQLAlchemy models, migrations, JWT access/refresh, role dependencies, audit logs, tests. **Acceptance:** migrations from empty DB and ownership/role/session tests pass. **Files:** `apps/api`, migrations, tests. **Rollback:** revert app and use reviewed forward migrations/recovery.

## v0.4.0 — Customer accounts and vehicles
**Status:** Planned · **Goal:** registration, login, profile, vehicle CRUD. **Acceptance:** customer accesses only own data. **Files:** customer screens, API modules, tests. **Rollback:** disable routes/screens and restore prior app.

## v0.5.0 — Services and booking
**Status:** Planned · **Goal:** catalogue, pricing, addresses, schedule, bookings. **Acceptance:** correct snapshots, no duplicate bookings, invalid transitions rejected. **Files:** service/booking API, migrations, app screens. **Rollback:** disable booking creation, preserve audit.

## v0.6.0 — Employee operations
**Status:** Planned · **Goal:** login, assignment, job details and status. **Acceptance:** employees see assigned jobs only; transitions audited. **Files:** employee app, APIs, CRM operations. **Rollback:** disable operations and restore prior app.

## v0.7.0 — Photos and notifications
**Status:** Planned · **Goal:** checklist, private photo storage, FCM, offline sync. **Acceptance:** authorized photo access and retry-safe sync. **Files:** storage APIs, FCM, local persistence. **Rollback:** disable uploads/notifications without deleting records.

## v0.8.0 — Payments
**Status:** Planned · **Goal:** gateway orders, signatures, webhooks, refunds, reconciliation. **Acceptance:** callback alone cannot mark paid; invalid/duplicate webhooks safe. **Files:** payment service, adapter, webhook, UI/tests. **Rollback:** disable initiation and reconcile existing transactions.

## v0.9.0 — Production hardening
**Status:** Planned · **Goal:** privacy, security, reliability and performance. **Tasks:** DPDP review, rate limits, backup/restore, monitoring, E2E/load/security, SBOM, runbooks. **Acceptance:** restore drill and critical workflows/findings reviewed. **Files:** security/privacy docs, monitoring, CI and runbooks. **Rollback:** disable affected features and follow recovery plan.

## v1.0.0 — Production launch
**Status:** Planned · **Goal:** commercial launch. **Tasks:** production hosting/database/signing, Play Store, privacy/legal review, support and incident response. **Acceptance:** intended distribution approval, backups, payments, bookings and operations verified. **Files:** production deployment, release workflows, store assets and policies. **Rollback:** app rollback, server feature flags, preserve financial/booking audit history.
