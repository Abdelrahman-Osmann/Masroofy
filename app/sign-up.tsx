import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { useAuth } from '../context/auth';

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirm: '', form: '' });

  function handleSignUp() {
    const newErrors = { name: '', email: '', password: '', confirm: '', form: '' };
    if (name.trim().length < 3) newErrors.name = 'Enter your full name.';
    if (!email.includes('@')) newErrors.email = 'Enter a valid email.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (confirm !== password) newErrors.confirm = 'Passwords do not match.';
    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.password || newErrors.confirm) return;

    const error = signUp(name, email, password);
    if (error) {
      setErrors({ ...newErrors, form: error });
      return;
    }
    router.replace('/home');
  }

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-6">
        <Text className="mb-6 text-base text-slate-500">Create your account to start tracking your expenses.</Text>

        <AppInput label="Full name" value={name} onChangeText={setName} placeholder="e.g. Omar Hassan" autoCapitalize="words" error={errors.name} />
        <AppInput label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <AppInput label="Password" value={password} onChangeText={setPassword} placeholder="At least 6 characters" secureTextEntry error={errors.password} />
        <AppInput label="Confirm password" value={confirm} onChangeText={setConfirm} placeholder="Type the password again" secureTextEntry error={errors.confirm} />
        {errors.form ? <Text className="mb-3 text-sm text-danger">{errors.form}</Text> : null}

        <AppButton title="Sign up" onPress={handleSignUp} />
      </View>
    </ScrollView>
  );
}
