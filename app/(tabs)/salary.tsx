import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { useExpenses } from '../../context/expenses';
import { currentMonth, formatMoney, monthName } from '../../utils/format';

export default function SalaryScreen() {
  const { salary, salaries, addSalary } = useExpenses();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  function handleSave() {
    if (!Number(amount) || Number(amount) <= 0) {
      setError('Enter a salary greater than 0.');
      setMessage('');
      return;
    }
    addSalary(Number(amount));
    setError('');
    setAmount('');
    setMessage('Salary saved successfully.');
  }

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-5">
        <View className="mb-5 rounded-2xl bg-primary p-5">
          <Text className="text-sm text-white/80">Salary for {monthName(currentMonth())}</Text>
          <Text className="mt-1 text-3xl font-bold text-white">{salary > 0 ? formatMoney(salary) : 'Not added yet'}</Text>
        </View>

        <AppInput label="Salary amount (EGP)" value={amount} onChangeText={setAmount} placeholder="e.g. 15000" keyboardType="numeric" error={error} />
        <Text className="mb-4 text-xs text-slate-500">Adding a salary again this month will replace the old one.</Text>
        {message ? <Text className="mb-3 font-semibold text-primary">{message}</Text> : null}
        <AppButton title="Save salary" onPress={handleSave} />

        <Text className="mb-3 mt-6 text-lg font-bold text-slate-900">Salary history</Text>
        {salaries.map((s) => (
          <View key={s.id} className="mb-2 flex-row justify-between rounded-xl border border-slate-200 bg-white p-4">
            <Text className="font-medium text-slate-800">{monthName(s.month)}</Text>
            <Text className="font-bold text-primary">+{formatMoney(s.amount)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
