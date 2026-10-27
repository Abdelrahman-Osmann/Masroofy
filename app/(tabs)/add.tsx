import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { CATEGORIES } from '../../data/categories';
import { useExpenses } from '../../context/expenses';
import { isValidDate, today } from '../../utils/format';

export default function AddTransactionScreen() {
  const { addTransaction } = useExpenses();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(today());
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({ amount: '', category: '', date: '' });
  const [message, setMessage] = useState('');
  const [budgetAlert, setBudgetAlert] = useState('');

  function handleSave() {
    const newErrors = { amount: '', category: '', date: '' };
    if (!Number(amount) || Number(amount) <= 0) newErrors.amount = 'Enter an amount greater than 0.';
    if (!category) newErrors.category = 'Choose a category.';
    if (!isValidDate(date)) newErrors.date = 'Write the date as YYYY-MM-DD.';
    else if (date > today()) newErrors.date = 'The date cannot be in the future.';
    setErrors(newErrors);
    if (newErrors.amount || newErrors.category || newErrors.date) {
      setMessage('');
      setBudgetAlert('');
      return;
    }

    const alertMessage = addTransaction(Number(amount), category, date, note.trim());

    setAmount('');
    setCategory('');
    setDate(today());
    setNote('');
    setMessage('Transaction saved.');
    setBudgetAlert(alertMessage);
  }

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-5">
        {budgetAlert ? (
          <View className="mb-4 flex-row items-center rounded-xl bg-amber-100 p-4">
            <Ionicons name="notifications" size={20} color="#D97706" />
            <Text className="ml-3 flex-1 font-semibold text-warning">{budgetAlert}</Text>
          </View>
        ) : null}

        <AppInput label="Amount (EGP)" value={amount} onChangeText={setAmount} placeholder="0" keyboardType="numeric" error={errors.amount} />

        <Text className="mb-2 text-sm font-medium text-slate-800">Category</Text>
        <View className="flex-row flex-wrap">
          {CATEGORIES.map((c) => {
            const selected = c.name === category;
            return (
              <Pressable
                key={c.name}
                onPress={() => setCategory(c.name)}
                className={`mb-2 mr-2 flex-row items-center rounded-full border px-3 py-2 ${selected ? 'border-primary bg-primary' : 'border-slate-300 bg-white'}`}
              >
                <Ionicons name={c.icon} size={16} color={selected ? 'white' : c.color} />
                <Text className={`ml-1.5 font-medium ${selected ? 'text-white' : 'text-slate-800'}`}>{c.name}</Text>
              </Pressable>
            );
          })}
        </View>
        {errors.category ? <Text className="mb-2 text-sm text-danger">{errors.category}</Text> : null}

        <View className="mt-3">
          <AppInput label="Date" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" error={errors.date} />
          <AppInput label="Note (optional)" value={note} onChangeText={setNote} placeholder="e.g. Lunch with friends" />
        </View>

        {message ? <Text className="mb-3 font-semibold text-primary">{message}</Text> : null}
        <AppButton title="Save transaction" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}
