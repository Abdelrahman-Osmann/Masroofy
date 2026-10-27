import { View } from 'react-native';

type ProgressBarProps = {
  percent: number;
  color: string;
};

export default function ProgressBar({ percent, color }: ProgressBarProps) {
  const width = Math.min(Math.max(percent, 0), 100);
  return (
    <View className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
      <View className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color }} />
    </View>
  );
}
