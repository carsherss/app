# CARSHERS BRAIN — Single Source of Truth

**Updated:** 30 October 2026 · **Current milestone:** v0.1.1 · **Repository:** https://github.com/carsherss/app

## Product
Doorstep car/bike washing service with separate Customer and Employee Android apps, a Next.js CRM, and a shared FastAPI/PostgreSQL backend.

## Components
- `apps/customer`: Customer Expo/React Native app.
- `apps/employee`: Employee Expo/React Native app.
- `apps/crm`: existing Next.js dashboard; outside v0.1.1.
- `apps/api`: existing FastAPI service; outside v0.1.1.
- `.github/workflows`: CI and Android builds.
- `scripts`: mobile bootstrap and APK verifier.

## Confirmed mobile baseline (official Expo reference checked 2026-10-30)
| Component | Baseline |
|---|---|
| Expo | SDK 58; npm range `~58.0.0` |
| React Native | 0.88 |
| React | 19.3.0 |
| Node.js | 22.13.x minimum |
| Java | Temurin 17 selected in workflow; validate owner CI |

Source: https://docs.expo.dev/versions/latest/ . The exact Expo patch and transitive versions are resolved by bootstrap and committed lockfiles.

## App identities
- Customer: `CARSHERS Customer`, `com.carshers.customer`, version `0.1.1`, versionCode `101`.
- Employee: `CARSHERS Employee`, `com.carshers.employee`, version `0.1.1`, versionCode `101`.

## Conventions
- Main branch `main`; use focused feature branches and pull requests.
- Tags: `vMAJOR.MINOR.PATCH`.
- SemVer for product version; monotonically increase Android versionCode per package.
- Conventional Commit style (`feat:`, `fix:`, `build:`, `docs:`, `chore:`).
- Commit npm lockfiles; CI uses `npm ci`.
- Do not commit generated Android folders in v0.1.1.
- Never commit secrets, `.env`, keystores or private keys.

## Constraints
- Free-tier GitHub Actions and services for this milestone; no paid EAS plan.
- v0.1.1 is standalone internal-testing APKs only.
- No login, booking, payments, backend or CRM feature implementation.
- Apps must never connect directly to production database; future data access goes through API.
- Preserve existing `apps/api`, `apps/crm`, and existing architecture/security/operations documents.

## Security principles
Least-privilege Actions permissions; no signing secrets in v0.1.1; verify bundle/signature/package/version/debuggable flag; avoid personal data and secrets in logs.

## Decisions
See `docs/adr/0001-monorepo.md` through `0004-payment-gateway.md`. PostgreSQL is planned; Razorpay is proposed, not implemented.

## Do not do
Do not relocate API, recreate API/CRM, add out-of-scope features, claim device testing without evidence, or distribute internal-signed builds as production releases.

## Version discipline
Work only on the current roadmap version. Complete acceptance checks and record evidence before moving to the next milestone.
