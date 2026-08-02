# Command Center 🎯

A universal (iOS, Android, Web) developer cheatsheet app for browsing and searching terminal/shell commands across multiple platforms and tools.

## Features

- **Browse commands** by category (File Operations, Git, Docker, Networking, etc.)
- **Search commands** by keyword, name, description, or tags
- **Filter by platform** (Linux/Unix, Windows, macOS, Termux, Cross-platform)
- **Mark favorites** for quick access
- **Copy commands** to clipboard with haptic feedback
- **Light/dark mode** (follows system theme)
- **Fully offline** — data is stored locally via SQLite

## Tech Stack

- [Expo SDK 56](https://docs.expo.dev/versions/v56.0.0/) + React Native 0.85 + React 19
- [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) for local data
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) for animations
- [iconsax-react-nativejs](https://www.npmjs.com/package/iconsax-react-nativejs) for icons
- Native bottom tabs via `expo-router/unstable-native-tabs`

## Get started

```bash
npm install
npx expo start
```

## Scripts

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `npm start`          | Start Expo dev server        |
| `npm run ios`        | Run on iOS simulator         |
| `npm run android`    | Run on Android emulator      |
| `npm run web`        | Run in browser               |
| `npm run lint`       | Run ESLint                   |
| `npm run typecheck`  | Run TypeScript type checking |
| `npm run ci`         | Run lint + typecheck         |
