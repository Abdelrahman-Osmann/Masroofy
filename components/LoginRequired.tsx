import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function LoginRequired() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 p-6">
      <Text className="mb-3 text-base text-slate-700">Please log in first.</Text>
      <Link href="/" className="font-semibold text-primary">
        Go to login
      </Link>
    </View>
  );
}
