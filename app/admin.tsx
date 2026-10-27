import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import LoginRequired from '../components/LoginRequired';
import StatBox from '../components/StatBox';
import { useAuth } from '../context/auth';

export default function AdminScreen() {
  const { user, accounts, logout, toggleAccountStatus, deleteAccount } = useAuth();
  const [deletingId, setDeletingId] = useState('');

  if (!user || user.role !== 'admin') return <LoginRequired />;

  const users = accounts.filter((a) => a.role === 'user');
  const activeUsers = users.filter((u) => u.status === 'active').length;
  let totalTransactions = 0;
  users.forEach((u) => {
    totalTransactions += u.transactionCount;
  });

  function handleLogout() {
    logout();
    router.replace('/');
  }

  return (
    <View className="flex-1 bg-slate-50 p-5">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-slate-900">Welcome, Admin</Text>
        <Pressable onPress={handleLogout}>
          <Text className="font-semibold text-primary">Log out</Text>
        </Pressable>
      </View>

      <Text className="mb-3 text-lg font-bold text-slate-900">App usage statistics</Text>
      <View className="flex-row flex-wrap justify-between">
        <StatBox label="Registered users" value={String(users.length)} />
        <StatBox label="Recorded transactions" value={String(totalTransactions)} />
        <StatBox label="Active accounts" value={String(activeUsers)} valueColor="text-primary" />
        <StatBox label="Disabled accounts" value={String(users.length - activeUsers)} valueColor="text-danger" />
      </View>

      <Text className="mb-3 mt-3 text-lg font-bold text-slate-900">User accounts</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const active = item.status === 'active';
          return (
            <View className="mb-3 rounded-2xl border border-slate-200 bg-white p-4">
              <View className="flex-row items-start justify-between">
                <View>
                  <Text className="text-base font-semibold text-slate-900">{item.name}</Text>
                  <Text className="text-sm text-slate-500">{item.email}</Text>
                </View>
                <Text className={`rounded-full px-2.5 py-1 text-xs font-semibold ${active ? 'bg-primary-light text-primary' : 'bg-red-100 text-danger'}`}>
                  {active ? 'Active' : 'Disabled'}
                </Text>
              </View>

              {deletingId === item.id ? (
                <View className="mt-3">
                  <Text className="mb-2 text-slate-700">Delete {item.name}'s account?</Text>
                  <View className="flex-row">
                    <Pressable onPress={() => setDeletingId('')} className="mr-2 flex-1 items-center rounded-lg border border-slate-300 py-2.5">
                      <Text className="font-semibold text-slate-800">Cancel</Text>
                    </Pressable>
                    <Pressable onPress={() => deleteAccount(item.id)} className="flex-1 items-center rounded-lg bg-danger py-2.5">
                      <Text className="font-semibold text-white">Yes, delete</Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View className="mt-3 flex-row">
                  <Pressable onPress={() => toggleAccountStatus(item.id)} className="mr-2 flex-1 items-center rounded-lg border border-slate-300 py-2.5">
                    <Text className="font-semibold text-slate-800">{active ? 'Disable' : 'Enable'}</Text>
                  </Pressable>
                  <Pressable onPress={() => setDeletingId(item.id)} className="flex-1 items-center rounded-lg bg-danger py-2.5">
                    <Text className="font-semibold text-white">Delete</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        }}
        ListEmptyComponent={<Text className="text-center text-slate-500">No registered users.</Text>}
      />
    </View>
  );
}
