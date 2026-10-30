# v0.1.1 Verification Record

**Prepared:** 30 October 2026. Artifact construction checks are distinct from owner-run Expo/Gradle/device checks.

## Official Expo facts checked
- [x] Expo changelog announces SDK 58 on 15 October 2026.
- [x] Official SDK matrix lists React Native 0.88, React 19.3.0 and minimum Node.js 22.13.x.
- [x] App manifests use Expo `~58.0.0`, React `19.3.0`, React Native `0.88.0`.
- [ ] Exact Expo patch/transitive resolution: owner must bootstrap and commit lockfiles.

Sources: https://expo.dev/changelog/sdk-58 and https://docs.expo.dev/versions/latest/

## Owner steps — execute in order
1. Extract overlay at repository root. Review diff. Confirm `apps/api`, `apps/crm`, and existing `docs/ARCHITECTURE.md`, `docs/SECURITY.md`, `docs/OPERATIONS.md`, `docs/INITIAL_ISSUES.md` are unchanged.
2. Run `node --version`, `npm --version`, then `bash scripts/bootstrap-mobile.sh` from root. Node must be 22.13.x+. Review and commit both app `package.json` and `package-lock.json` files.
3. Run `cd apps/customer && npm run typecheck && cd ../employee && npm run typecheck`.
4. Push to `main` or manually dispatch both Android workflows.
5. Confirm each workflow runs npm ci, Expo Doctor, prebuild, `assembleRelease`, and `scripts/verify-apk.sh`.
6. Download both artifacts; each must contain APK and `.sha256`.
7. Verify checksum in extracted artifact directory using `sha256sum -c app-release.apk.sha256` (inspect checksum filename/path and run from the matching directory if needed).
8. Install each APK on a physical Android device and complete `docs/testing/DEVICE_TEST_v0.1.1.md`.
9. Test first launch and force-stop/relaunch in airplane mode. This checks that startup does not need Metro or network.
10. Record device, Android version, APK SHA-256 and results. Only then mark v0.1.1 complete and date the changelog release.

## Not executed by this artifact-generation step
- npm install/npm ci for either app.
- `npx expo install --fix` or `npx expo-doctor`.
- `npx expo prebuild`.
- Gradle `assembleRelease`.
- Bundle inspection against a real generated APK.
- `apksigner` or `aapt`/`aapt2` verification against a real APK.
- GitHub Actions execution.
- Physical-device install, airplane-mode launch or relaunch.
- Mermaid rendering on GitHub.
- Production signing (out of v0.1.1 scope).

## Notes
- Existing `ci.yml` is intentionally omitted so current CI remains untouched.
- Generated Android projects and npm lockfiles are intentionally absent.
- Action tags such as `@v4` are used as requested; pin to verified full commit SHAs during security hardening.
- `.hbc` is accepted only as the explicitly named Hermes bytecode entry `assets/index.android.bundle.hbc`; inspect the real APK before relying on this alternate path.
- Workflow release signing is for internal testing only; production signing is deferred to v0.2.0.
- Local APK verification requires Android SDK build-tools under `ANDROID_SDK_ROOT` or `ANDROID_HOME`.
