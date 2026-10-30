# ADR 0002: Expo and React Native

## Context
Two independently installable Android applications need reproducible builds.

## Decision
Use Expo SDK 58, React Native 0.88, React 19.3.0 and Node.js 22.13.x minimum, according to the official Expo SDK reference checked 30 October 2026. The precise Expo patch is resolved during bootstrap and locked by npm.

## Consequences
CI generates Android projects using Expo prebuild. Lockfiles are created by the owner and committed; generated Android directories are excluded from this overlay.
