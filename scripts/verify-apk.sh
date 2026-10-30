#!/usr/bin/env bash
set -Eeuo pipefail
[[ $# -eq 3 ]] || { echo "Usage: $0 <apk> <expected-package> <expected-versionCode>" >&2; exit 2; }
APK="$1"; PKG="$2"; VC="$3"
[[ -s "$APK" ]] || { echo "ERROR: APK missing or empty: $APK" >&2; exit 1; }
SDK="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-}}"
[[ -d "$SDK/build-tools" ]] || { echo 'ERROR: Set ANDROID_SDK_ROOT or ANDROID_HOME.' >&2; exit 1; }
BT="$(find "$SDK/build-tools" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort -V | tail -n1)"; D="$SDK/build-tools/$BT"
[[ -x "$D/apksigner" ]] || { echo "ERROR: apksigner missing in $D" >&2; exit 1; }
if [[ -x "$D/aapt" ]]; then BADGING="$("$D/aapt" dump badging "$APK")"; elif [[ -x "$D/aapt2" ]]; then BADGING="$("$D/aapt2" dump badging "$APK")"; else echo 'ERROR: aapt/aapt2 missing' >&2; exit 1; fi
"$D/apksigner" verify --verbose "$APK"
unzip -Z1 "$APK" | grep -Eq '^assets/index\.android\.bundle(\.hbc)?$' || { echo 'ERROR: expected assets/index.android.bundle or explicitly named Hermes .hbc entry missing' >&2; unzip -Z1 "$APK" | grep -Ei 'bundle|\.hbc$' >&2 || true; exit 1; }
LINE="$(printf '%s\n' "$BADGING" | grep -m1 '^package:')"
[[ "$LINE" == *"name='$PKG'"* ]] || { echo "ERROR: package mismatch: $LINE" >&2; exit 1; }
[[ "$LINE" == *"versionCode='$VC'"* ]] || { echo "ERROR: versionCode mismatch: $LINE" >&2; exit 1; }
if printf '%s\n' "$BADGING" | grep -q '^application-debuggable'; then echo 'ERROR: APK is debuggable' >&2; exit 1; fi
if command -v sha256sum >/dev/null; then (cd "$(dirname "$APK")" && sha256sum "$(basename "$APK")" | tee "$(basename "$APK").sha256"); else (cd "$(dirname "$APK")" && shasum -a 256 "$(basename "$APK")" | tee "$(basename "$APK").sha256"); fi
echo "APK structural checks passed; build-tools $BT."
