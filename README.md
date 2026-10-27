# Masroofy

A personal finance management mobile app, built for the Mobile Development project in my BUE senior year. Masroofy helps users record income and expenses, set monthly budgets, and see where their money goes.

## Features

- **Login and sign up** for regular users, plus an **admin dashboard** to view, activate/deactivate and delete user accounts
- **Home**: overview of recent transactions
- **Add**: record a new expense in a category (Food, Transport, Shopping, Bills, Health, Entertainment, Other)
- **Salary**: set and track monthly income
- **Budget**: set a monthly budget and follow progress with a progress bar
- **Summary**: statistics and a spending breakdown by category

## Tech stack

- [Expo](https://expo.dev) (SDK 58) and React Native 0.88
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation
- [NativeWind](https://www.nativewind.dev) (Tailwind CSS) for styling
- TypeScript
- React Context for state (`context/auth.tsx`, `context/expenses.tsx`) with sample data in `data/`

## Project structure

```
app/            Screens and routes (login, sign-up, admin, and the tab screens in app/(tabs))
components/     Shared UI (AppButton, AppInput, StatBox, ProgressBar, TransactionCard, ...)
context/        Auth and expenses providers
constants/      Colors
data/           Categories and sample data
utils/          Formatting helpers
assets/         Icons and splash images
```

## Getting started

Requirements: [Node.js](https://nodejs.org) (LTS) and npm. To run on a phone, install the Expo Go app.

```bash
git clone https://github.com/Abdelrahman-Osmann/Masroofy.git
cd Masroofy
npm install
npm start
```

Then scan the QR code with Expo Go, or press `a` (Android emulator), `i` (iOS simulator) or `w` (web).

| Command | Description |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm run android` | Start and open on Android |
| `npm run ios` | Start and open on iOS |
| `npm run web` | Start and open in the browser |

## Team

- [Abdelrahman Osman](https://github.com/Abdelrahman-Osmann): setup, auth, budget, summary and admin screens
- [philohany-byte](https://github.com/philohany-byte): home, add transaction and salary screens
