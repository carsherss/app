#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

command -v node >/dev/null || {
  echo "ERROR: Node.js 22.13.x+ required" >&2
  exit 1
}

command -v npm >/dev/null || {
  echo "ERROR: npm required" >&2
  exit 1
}

node -e '
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 13)) {
  console.error("Node.js 22.13.x+ required; found " + process.version);
  process.exit(1);
}
'

for APP in customer employee; do
  echo ""
  echo "========== BOOTSTRAPPING $APP =========="

  (
    cd "$ROOT/apps/$APP"

    echo "[1] Installing Expo SDK and compatible React Native..."
    npm install expo@~58.0.0 react@19.3.0 react-native@0.88.1

    echo "[2] Installing Expo splash screen..."
    npx expo install expo-splash-screen

    echo "[3] Installing compatible TypeScript..."
    npm install --save-dev typescript@~6.0.3 @types/react

    echo "[4] Aligning Expo dependencies..."
    npx expo install --fix

    echo "[5] Running Expo Doctor..."
    npx expo-doctor

    echo "[6] Running TypeScript validation..."
    npm run typecheck

    echo "[7] Verifying dependency versions..."
    npm ls expo expo-splash-screen react react-native typescript --depth=0
  )
done

echo ""
echo "Both CARSHERS mobile apps passed bootstrap validation."
echo "Commit package.json and package-lock.json for both apps."
echo "Do not commit generated android/ folders."
