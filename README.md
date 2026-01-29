# 💩 Plop - Poop Tracker

A beautiful, bathroom-first poop tracking app built with React Native and Expo.

## Features

- **Quick Logging** - Log in 3 taps or less
- **Bristol Scale** - Visual type selection with health indicators  
- **Quick Tags** - Track what affects your digestion
- **Timeline** - See your history at a glance
- **Insights** - Understand your patterns

## Getting Started

### Prerequisites

1. **Node.js** (v18 or later)
2. **Expo Go app** on your phone (from App Store / Play Store)

### Installation

```bash
# Navigate to project
cd plop

# Install dependencies (if not already done)
npm install

# Start the development server
npx expo start
```

### Running on your phone

1. Open **Expo Go** app on your phone
2. Scan the QR code shown in the terminal
3. The app will load on your device!

### Running on Simulator/Emulator

- **iOS Simulator** (Mac only): Press `i` in terminal
- **Android Emulator**: Press `a` in terminal
- **Web browser**: Press `w` in terminal

## Project Structure

```
plop/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── BristolSelector.tsx
│   │   ├── TagSelector.tsx
│   │   ├── PrimaryButton.tsx
│   │   ├── StatCard.tsx
│   │   └── TimelineEntry.tsx
│   ├── screens/           # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── LogScreen.tsx
│   │   ├── TimelineScreen.tsx
│   │   └── InsightsScreen.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── usePoopHistory.ts
│   ├── constants/         # App constants & colors
│   │   └── index.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   └── utils/             # Helper functions
│       └── index.ts
└── assets/                # Images & icons
```

## Building for Production

### Setup EAS (Expo Application Services)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Configure the project
eas build:configure
```

### Build for App Stores

```bash
# iOS (creates .ipa for App Store)
eas build --platform ios

# Android (creates .aab for Play Store)
eas build --platform android
```

### Submit to Stores

```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

## Publishing Costs

| Item | Cost |
|------|------|
| Apple Developer Account | $99/year |
| Google Play Developer | $25 (one-time) |
| Expo EAS Free Tier | $0 |
| **Total to start** | ~$125 USD |

## Customization

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Change Bundle ID
Before first build, edit `app.json`:
```json
{
  "ios": {
    "bundleIdentifier": "com.yourname.plop"
  },
  "android": {
    "package": "com.yourname.plop"
  }
}
```

### Add Custom App Icon
Replace these files with your designs:
- `assets/icon.png` (1024x1024)
- `assets/adaptive-icon.png` (1024x1024, Android)
- `assets/splash-icon.png` (optional)

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform & build service
- **TypeScript** - Type safety
- **AsyncStorage** - Local data persistence
- **Expo Haptics** - Touch feedback
- **React Navigation** - Screen navigation

## Future Ideas

- [ ] iCloud / Google Drive backup
- [ ] Apple Health integration
- [ ] Widgets
- [ ] Notifications / reminders
- [ ] Export data to PDF
- [ ] Dark/Light theme toggle
- [ ] Multiple profiles

---

Made with 💩 and ❤️
