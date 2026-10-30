# Android release build — v0.1.1

## Prerequisites
Node.js 22.13.x+, npm, JDK 17, Git; Android SDK/build-tools for local APK verification.

## Bootstrap
From repository root: `bash scripts/bootstrap-mobile.sh`. Review and commit both app `package.json` and `package-lock.json` files. Do not commit generated `android/` folders.

## Local build (inside each app)
```bash
npx expo-doctor
npx expo prebuild --clean --platform android
cd android
./gradlew --no-daemon :app:assembleRelease
```
Expected output: `android/app/build/outputs/apk/release/app-release.apk`.

## Verify (from repository root)
```bash
bash scripts/verify-apk.sh apps/customer/android/app/build/outputs/apk/release/app-release.apk com.carshers.customer 101
bash scripts/verify-apk.sh apps/employee/android/app/build/outputs/apk/release/app-release.apk com.carshers.employee 101
```

The verifier checks APK presence, bundle entry, signature, package ID, versionCode and debuggable status, then writes `.sha256`. It accepts `assets/index.android.bundle` or the explicitly named Hermes bytecode entry `assets/index.android.bundle.hbc`. If the toolchain emits a different entry, inspect the real APK and update the check only after identifying the actual executable JS bundle.

## GitHub Actions artifacts
Open Actions, select the relevant Customer or Employee Android workflow, open a completed run, scroll to Artifacts, download the matching `carshers-*-0.1.1-release-apk` archive, extract it and install the APK. The artifact includes its SHA-256 file.

## Signing boundary
v0.1.1 uses generated debug-style signing for internal testing only. Do not distribute these as production Play releases. Production upload-key signing through GitHub Secrets is deferred to v0.2.0.

Complete `docs/testing/DEVICE_TEST_v0.1.1.md`; a green workflow is not a substitute for physical-device testing.
