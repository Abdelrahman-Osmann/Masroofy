import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import ProgressBar from '../../components/ProgressBar';
import { COLORS } from '../../constants/Colors';
import { useExpenses } from '../../context/expenses';
import { currentMonth, formatMoney, monthName } from '../../utils/format';

export default function BudgetScreen() {
  const { budget, totalSpent, setMonthlyBudget } = useExpenses();
  const [limit, setLimit] = useState(budget > 0 ? String(budget) : '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const percent = budget > 0 ? (totalSpent / budget) * 100 : 0;
  const barColor = percent >= 100 ? COLORS.danger : percent >= 50 ? COLORS.warning : COLORS.primary;

  function handleSave() {
    if (!Number(limit) || Number(limit) <= 0) {
      setError('Enter a budget greater than 0.');
      setMessage('');
      return;
    }
    setMonthlyBudget(Number(limit));
    setError('');
    setMessage('Budget saved.');
  }

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-5">
        <View className="mb-5 rounded-2xl border border-slate-200 bg-white p-5">
          <Text className="text-sm text-slate-500">{monthName(currentMonth())}</Text>
          {budget > 0 ? (
            <>
              <Text className="mb-3 mt-1 text-2xl font-bold text-slate-900">
                {formatMoney(totalSpent)} <Text className="text-base font-normal text-slate-500">of {formatMoney(budget)}</Text>
              </Text>
              <ProgressBar percent={percent} color={barColor} />
              {totalSpent > budget ? (
                <Text className="mt-2 font-semibold text-danger">You exceeded your budget by {formatMoney(totalSpent - budget)}!</Text>
              ) : (
                <Text className="mt-2 text-slate-600">
                  {Math.round(percent)}% used · {formatMoney(budget - totalSpent)} left
                </Text>
              )}
            </>
          ) : (
            <Text className="mt-1 text-base text-slate-700">You have not set a budget for this month.</Text>
          )}
        </View>

        <AppInput label="Monthly budget (EGP)" value={limit} onChangeText={setLimit} placeholder="e.g. 6000" keyboardType="numeric" error={error} />
        {message ? <Text className="mb-3 font-semibold text-primary">{message}</Text> : null}
        <AppButton title="Save budget" onPress={handleSave} />

        <Text className="mb-1 mt-6 text-lg font-bold text-slate-900">Budget alerts</Text>
        <Text className="mb-3 text-sm text-slate-500">You get a notification when your spending reaches these levels.</Text>
        {[50, 75, 100].map((level) => {
          const reached = budget > 0 && percent >= level;
          return (
            <View key={level} className="mb-2 flex-row items-center rounded-xl border border-slate-200 bg-white p-4">
              <Ionicons name={reached ? 'notifications' : 'notifications-outline'} size={20} color={reached ? COLORS.warning : COLORS.gray} />
              <Text className="ml-3 flex-1 text-base text-slate-800">
                {level}% of budget ({formatMoney((budget * level) / 100)})
              </Text>
              <Text className={`font-semibold ${reached ? 'text-warning' : 'text-slate-400'}`}>{reached ? 'Reached' : 'Not yet'}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
