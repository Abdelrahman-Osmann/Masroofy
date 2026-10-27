import { Text, TextInput, View } from 'react-native';

type AppInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words';
};

export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'sentences',
}: AppInputProps) {
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-medium text-slate-800">{label}</Text>
      <TextInput
        className={`rounded-xl border bg-white px-4 py-3 text-base text-slate-900 ${error ? 'border-danger' : 'border-slate-300'}`}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
      {error ? <Text className="mt-1 text-sm text-danger">{error}</Text> : null}
    </View>
  );
}
