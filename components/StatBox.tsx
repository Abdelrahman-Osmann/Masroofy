import { Text, View } from 'react-native';

type StatBoxProps = {
  label: string;
  value: string;
  valueColor?: string;
};

export default function StatBox({ label, value, valueColor = 'text-slate-900' }: StatBoxProps) {
  return (
    <View className="mb-3 w-[48%] rounded-2xl border border-slate-200 bg-white p-4">
      <Text className="text-xs font-medium uppercase text-slate-500">{label}</Text>
      <Text className={`mt-1 text-lg font-bold ${valueColor}`}>{value}</Text>
    </View>
  );
}
