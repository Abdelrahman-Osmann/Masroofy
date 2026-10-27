import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { useAuth } from '../context/auth';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });

  function handleLogin() {
    const newErrors = { email: '', password: '', form: '' };
    if (!email.includes('@')) newErrors.email = 'Enter a valid email.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    const result = login(email, password);
    if (result.error) {
      setErrors({ ...newErrors, form: result.error });
    } else if (result.role === 'admin') {
      router.replace('/admin');
    } else {
      router.replace('/home');
    }
  }

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-6 pt-16">
        <Text className="text-4xl font-bold text-primary">Masroofy</Text>
        <Text className="mb-8 mt-1 text-base text-slate-500">Track your money, stay within your budget.</Text>

        <AppInput label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <AppInput label="Password" value={password} onChangeText={setPassword} placeholder="At least 6 characters" secureTextEntry error={errors.password} />
        {errors.form ? <Text className="mb-3 text-sm text-danger">{errors.form}</Text> : null}

        <AppButton title="Log in" onPress={handleLogin} />

        <View className="mt-5 flex-row justify-center">
          <Text className="text-slate-500">Don't have an account? </Text>
          <Link href="/sign-up" className="font-semibold text-primary">
            Sign up
          </Link>
        </View>

        <View className="mt-8 rounded-xl bg-primary-light p-4">
          <Text className="font-semibold text-primary">Test accounts</Text>
          <Text className="mt-1 text-slate-700">User: user@masroofy.com / 123456</Text>
          <Text className="text-slate-700">Admin: admin@masroofy.com / admin123</Text>
        </View>
      </View>
    </ScrollView>
  );
}
