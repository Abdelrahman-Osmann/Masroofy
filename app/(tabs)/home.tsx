import { router } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import TransactionCard from '../../components/TransactionCard';
import { useAuth } from '../../context/auth';
import { useExpenses } from '../../context/expenses';
import { currentMonth, formatMoney, monthName } from '../../utils/format';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { transactions, salary, totalSpent, editTransactionAmount, deleteTransaction } = useExpenses();

  function handleLogout() {
    logout();
    router.replace('/');
  }

  return (
    <View className="flex-1 bg-slate-50 p-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-slate-500">{monthName(currentMonth())}</Text>
        <Pressable onPress={handleLogout}>
          <Text className="font-semibold text-primary">Log out</Text>
        </Pressable>
      </View>
      <Text className="mb-4 text-2xl font-bold text-slate-900">Hi, {user ? user.name.split(' ')[0] : ''}</Text>

      <View className="mb-5 rounded-2xl bg-primary p-5">
        <Text className="text-sm text-white/80">Remaining this month</Text>
        <Text className="mt-1 text-3xl font-bold text-white">{formatMoney(salary - totalSpent)}</Text>
        <View className="mt-3 flex-row justify-between">
          <Text className="text-sm text-white/80">Salary {formatMoney(salary)}</Text>
          <Text className="text-sm text-white/80">Spent {formatMoney(totalSpent)}</Text>
        </View>
      </View>

      <Text className="mb-3 text-lg font-bold text-slate-900">Transactions ({transactions.length})</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onSaveAmount={(amount) => editTransactionAmount(item.id, amount)}
            onDelete={() => deleteTransaction(item.id)}
          />
        )}
        ListEmptyComponent={<Text className="mt-6 text-center text-slate-500">No transactions yet. Add one from the Add tab.</Text>}
      />
    </View>
  );
}
