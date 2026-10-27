import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';

import ProgressBar from '../../components/ProgressBar';
import StatBox from '../../components/StatBox';
import { getCategory } from '../../data/categories';
import { useExpenses } from '../../context/expenses';
import { currentMonth, formatMoney, monthName } from '../../utils/format';

export default function SummaryScreen() {
  const { salary, totalSpent, budget, transactions, getCategoryTotals } = useExpenses();
  const categoryTotals = getCategoryTotals();
  const count = transactions.filter((t) => t.date.startsWith(currentMonth())).length;
  const saved = salary - totalSpent;

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-5">
        <Text className="mb-3 text-lg font-bold text-slate-900">{monthName(currentMonth())}</Text>

        <View className="flex-row flex-wrap justify-between">
          <StatBox label="Salary" value={formatMoney(salary)} valueColor="text-primary" />
          <StatBox label="Total spent" value={formatMoney(totalSpent)} valueColor="text-danger" />
          <StatBox label="Saved" value={formatMoney(saved)} valueColor={saved < 0 ? 'text-danger' : 'text-slate-900'} />
          <StatBox label="Budget used" value={budget > 0 ? Math.round((totalSpent / budget) * 100) + '%' : 'No budget'} />
        </View>

        <View className="mt-2 rounded-2xl border border-slate-200 bg-white p-5">
          <View className="mb-4 flex-row justify-between">
            <Text className="text-base font-bold text-slate-900">Spending by category</Text>
            <Text className="text-sm text-slate-500">{count} transactions</Text>
          </View>

          {categoryTotals.length === 0 ? (
            <Text className="text-slate-500">No spending this month yet.</Text>
          ) : (
            categoryTotals.map((row) => {
              const category = getCategory(row.category);
              const percent = (row.total / totalSpent) * 100;
              return (
                <View key={row.category} className="mb-4">
                  <View className="mb-1.5 flex-row items-center">
                    <Ionicons name={category.icon} size={18} color={category.color} />
                    <Text className="ml-2 flex-1 font-medium text-slate-800">{category.name}</Text>
                    <Text className="text-slate-700">
                      {formatMoney(row.total)} · {Math.round(percent)}%
                    </Text>
                  </View>
                  <ProgressBar percent={percent} color={category.color} />
                </View>
              );
            })
          )}
        </View>

        {categoryTotals.length > 0 ? (
          <View className="mt-4 rounded-2xl bg-primary-light p-4">
            <Text className="text-slate-800">
              You spent the most on <Text className="font-bold">{categoryTotals[0].category}</Text> this month ({formatMoney(categoryTotals[0].total)}).
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
