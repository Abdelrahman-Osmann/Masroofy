import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { COLORS } from '../constants/Colors';
import { getCategory } from '../data/categories';
import type { Transaction } from '../data/mockData';
import { formatMoney } from '../utils/format';

type TransactionCardProps = {
  transaction: Transaction;
  onSaveAmount: (amount: number) => void;
  onDelete: () => void;
};

export default function TransactionCard({ transaction, onSaveAmount, onDelete }: TransactionCardProps) {
  const category = getCategory(transaction.category);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [newAmount, setNewAmount] = useState(String(transaction.amount));
  const [error, setError] = useState('');

  function save() {
    const amount = Number(newAmount);
    if (!amount || amount <= 0) {
      setError('Enter an amount greater than 0');
      return;
    }
    onSaveAmount(amount);
    setError('');
    setEditing(false);
  }

  function cancelEdit() {
    setNewAmount(String(transaction.amount));
    setError('');
    setEditing(false);
  }

  return (
    <View className="mb-3 rounded-2xl border border-slate-200 bg-white p-4">
      <View className="flex-row items-center">
        <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: category.color + '22' }}>
          <Ionicons name={category.icon} size={20} color={category.color} />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-base font-semibold text-slate-900">{transaction.note || category.name}</Text>
          <Text className="text-sm text-slate-500">
            {category.name} · {transaction.date}
          </Text>
        </View>
        <Text className="text-base font-bold text-danger">-{formatMoney(transaction.amount)}</Text>
      </View>

      {editing ? (
        <View className="mt-3">
          <View className="flex-row items-center">
            <TextInput
              className="mr-2 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-base"
              value={newAmount}
              onChangeText={setNewAmount}
              keyboardType="numeric"
            />
            <Pressable onPress={save} className="rounded-lg bg-primary px-4 py-2.5">
              <Text className="font-semibold text-white">Save</Text>
            </Pressable>
            <Pressable onPress={cancelEdit} className="ml-2 px-2 py-2.5">
              <Text className="font-semibold text-slate-500">Cancel</Text>
            </Pressable>
          </View>
          {error ? <Text className="mt-1 text-sm text-danger">{error}</Text> : null}
        </View>
      ) : null}

      {deleting ? (
        <View className="mt-3 flex-row items-center justify-end border-t border-slate-100 pt-3">
          <Text className="mr-auto text-slate-700">Delete this transaction?</Text>
          <Pressable onPress={() => setDeleting(false)} className="mr-4">
            <Text className="font-semibold text-slate-500">No</Text>
          </Pressable>
          <Pressable onPress={onDelete}>
            <Text className="font-semibold text-danger">Yes</Text>
          </Pressable>
        </View>
      ) : null}

      {!editing && !deleting ? (
        <View className="mt-3 flex-row justify-end border-t border-slate-100 pt-3">
          <Pressable onPress={() => setEditing(true)} className="mr-5 flex-row items-center">
            <Ionicons name="create-outline" size={18} color={COLORS.primary} />
            <Text className="ml-1 font-semibold text-primary">Edit</Text>
          </Pressable>
          <Pressable onPress={() => setDeleting(true)} className="flex-row items-center">
            <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
            <Text className="ml-1 font-semibold text-danger">Delete</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
