import '../global.css';

import { Stack } from 'expo-router';

import { AuthProvider } from '../context/auth';
import { ExpensesProvider } from '../context/expenses';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ExpensesProvider>
        <Stack screenOptions={{ headerTintColor: '#0F766E' }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ title: 'Create account' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ title: 'Admin dashboard', headerBackVisible: false, gestureEnabled: false }} />
        </Stack>
      </ExpensesProvider>
    </AuthProvider>
  );
}
