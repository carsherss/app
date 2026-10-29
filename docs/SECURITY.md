# Security checklist

Before real customers or employees use CARSHERS:

- Implement password hashing or a verified OTP provider; never store plaintext passwords.
- Use short-lived access tokens and safe refresh-token handling.
- Enforce authorization in every API endpoint, not only in the UI.
- Validate input with Pydantic and enforce booking state transitions server-side.
- Add rate limiting, secure CORS, HTTPS, request logging and secret management.
- Store photos in private object storage and issue short-lived signed URLs.
- Restrict employee access to assigned jobs.
- Do not put personal data or secrets in GitHub Issues, logs, APK assets, or source code.
- Back up the database and test restoration.
- Protect `main`, require pull-request review where feasible, and review workflow permissions.
- Pin GitHub Actions to reviewed versions/SHAs before production.
- Rotate credentials immediately if exposed.
