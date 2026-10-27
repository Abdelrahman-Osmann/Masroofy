import { Pressable, Text } from 'react-native';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'outline';
};

export default function AppButton({ title, onPress, variant = 'primary' }: AppButtonProps) {
  let boxStyle = 'bg-primary';
  if (variant === 'danger') boxStyle = 'bg-danger';
  if (variant === 'outline') boxStyle = 'border border-slate-300 bg-white';
  const textStyle = variant === 'outline' ? 'text-slate-800' : 'text-white';

  return (
    <Pressable onPress={onPress} accessibilityRole="button" className={`items-center rounded-xl px-4 py-3.5 active:opacity-70 ${boxStyle}`}>
      <Text className={`text-base font-semibold ${textStyle}`}>{title}</Text>
    </Pressable>
  );
}
