# CARSHERS — Monorepo Starter

Customer Android app, employee Android app, CRM/website, and shared API for a doorstep car and bike washing service.

> This is a development scaffold, not a production-ready booking or payment system. The initial apps are shells; authentication, booking rules, notifications, payment integrations, and production deployment are follow-up milestones.

## Repository layout

- `apps/customer` — Expo / React Native customer app
- `apps/employee` — Expo / React Native employee app
- `apps/crm` — Next.js CRM and public website shell
- `apps/api` — FastAPI API starter
- `.github/workflows` — CI and Android APK workflows
- `docs` — architecture, security, operations

## Prerequisites

- Node.js 22 LTS (or another version supported by the chosen Expo SDK)
- npm
- Python 3.11+
- Git
- Android phone for APK testing
- GitHub repository access with Actions enabled

## Local development

### API

```bash
cd apps/api
python -m venv .venv
# Linux/macOS:
source .venv/bin/activate
# Windows PowerShell:
# .venv\Scripts\Activate.ps1
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000/health` and `http://127.0.0.1:8000/docs`.

### CRM

```bash
cd apps/crm
npm install
npm run dev
```

Open `http://localhost:3000`.

### Customer app

```bash
cd apps/customer
npm install
npx expo start
```

### Employee app

```bash
cd apps/employee
npm install
npx expo start
```

## GitHub setup

1. Download and extract this starter.
2. Copy its contents into the root of `carsherss/app`.
3. Commit and push to `main` or preferably a setup branch and open a pull request.
4. In GitHub, open **Settings → Actions → General** and allow the repository's workflows to run.
5. Run **Actions → Customer Android APK** and **Actions → Employee Android APK**.
6. Download the debug APK artifact from a successful workflow run.
7. Install it on a test Android phone. You may need to allow installation from the browser/file manager that opened the APK.

The APK workflows build **debug APKs for internal testing**. Do not distribute these as production releases. A production release workflow must use a protected signing key stored in GitHub Actions secrets and a carefully controlled release process.

## Security and production notes

- Never commit `.env`, passwords, API keys, database URLs, signing keys, or keystore files.
- The public repository should contain no real customer data.
- The API currently exposes a health endpoint only. Do not use it to accept live bookings yet.
- Before production, add authenticated roles and server-side authorization, PostgreSQL, Alembic migrations, validation, rate limiting, backups, monitoring, and tested recovery procedures.
- Configure a real HTTPS API URL for mobile apps before deploying them to users.
