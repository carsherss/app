# CARSHERS CRM — GitHub Pages deployment

## What this publishes

The CRM is exported as static HTML, CSS, JavaScript and assets. GitHub Pages does not run a Next.js server. The preview contains deterministic synthetic data only; browser actions are temporary and reset after reload.

## Repository setup

1. Merge the CRM preview pull request into `main`.
2. Open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Confirm the `CRM Pages` workflow is enabled.
4. Run the workflow on `main` if a push did not trigger it.
5. Open the deployed Pages URL and test all eight routes on desktop and mobile.

The workflow builds on pull requests and uploads a downloadable preview artifact. It deploys only for a push to `main` or a manual dispatch on `main`.

## Base path

`NEXT_PUBLIC_BASE_PATH` is empty for a root deployment. GitHub Actions sets it to the repository name for the standard `https://OWNER.github.io/REPOSITORY/` project site. For a custom domain at the root, use an empty value.

## Local build

From the repository root:

```bash
cd apps/crm
npm ci
npx tsc --noEmit
NEXT_PUBLIC_BASE_PATH=carshers-app npx next build
cd ../..
node scripts/check-crm-export.mjs apps/crm/out
```

Use the actual GitHub repository name in `NEXT_PUBLIC_BASE_PATH`. Do not run `next start`; static export has no server runtime.

## Troubleshooting

- Missing lockfile: restore `apps/crm/package-lock.json`; CI deliberately fails before install with a clear message.
- Broken project-site asset paths: verify `NEXT_PUBLIC_BASE_PATH` matches the repository name exactly.
- Pages deployment permission failure: verify Pages is enabled and the repository Actions workflow has Pages write and OIDC permissions.
- Large artifact: inspect `apps/crm/out`; the validator enforces a 15 MiB budget.
