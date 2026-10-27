import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import LoginRequired from '../../components/LoginRequired';
import { COLORS } from '../../constants/Colors';
import { useAuth } from '../../context/auth';

export default function TabsLayout() {
  const { user } = useAuth();
  if (!user) return <LoginRequired />;

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.primary }}>
      <Tabs.Screen
        name="home"
        options={{ title: 'Home', tabBarIcon: ({ focused, size }) => <Ionicons name="home-outline" color={focused ? COLORS.primary : COLORS.gray} size={size} /> }}
      />
      <Tabs.Screen
        name="add"
        options={{ title: 'Add', tabBarIcon: ({ focused, size }) => <Ionicons name="add-circle-outline" color={focused ? COLORS.primary : COLORS.gray} size={size} /> }}
      />
      <Tabs.Screen
        name="salary"
        options={{ title: 'Salary', tabBarIcon: ({ focused, size }) => <Ionicons name="cash-outline" color={focused ? COLORS.primary : COLORS.gray} size={size} /> }}
      />
      <Tabs.Screen
        name="budget"
        options={{ title: 'Budget', tabBarIcon: ({ focused, size }) => <Ionicons name="wallet-outline" color={focused ? COLORS.primary : COLORS.gray} size={size} /> }}
      />
      <Tabs.Screen
        name="summary"
        options={{ title: 'Summary', tabBarIcon: ({ focused, size }) => <Ionicons name="pie-chart-outline" color={focused ? COLORS.primary : COLORS.gray} size={size} /> }}
      />
    </Tabs>
  );
}
