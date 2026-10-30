# Contributing

Contributions must stay within the active milestone. v0.1.1 is limited to standalone Android release APK generation and verification.

1. Open an issue. 2. Create a focused branch from `main`. 3. Make a scoped change. 4. Run relevant checks. 5. Open a PR using the template. 6. Wait for CI and review.

Run `bash scripts/bootstrap-mobile.sh` and commit both mobile lockfiles before Android workflows. Use TypeScript strict mode, distinct package IDs, Conventional Commit-style messages, and update docs/changelog. Do not commit generated Android folders, secrets or keystores. Do not add login, booking, payments, backend or CRM features in v0.1.1.
