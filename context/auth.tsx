import { createContext, useContext, useState, type PropsWithChildren } from 'react';

import { SAMPLE_ACCOUNTS, type Account } from '../data/mockData';

type LoginResult = {
  error: string;
  role: string;
};

type AuthValue = {
  user: Account | null;
  accounts: Account[];
  login: (email: string, password: string) => LoginResult;
  signUp: (name: string, email: string, password: string) => string;
  logout: () => void;
  toggleAccountStatus: (id: string) => void;
  deleteAccount: (id: string) => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [accounts, setAccounts] = useState<Account[]>(SAMPLE_ACCOUNTS);
  const [user, setUser] = useState<Account | null>(null);

  function login(email: string, password: string): LoginResult {
    const account = accounts.find((a) => a.email === email.trim().toLowerCase());
    if (!account || account.password !== password) {
      return { error: 'Wrong email or password.', role: '' };
    }
    if (account.status === 'disabled') {
      return { error: 'This account has been disabled by the admin.', role: '' };
    }
    setUser(account);
    return { error: '', role: account.role };
  }

  function signUp(name: string, email: string, password: string): string {
    const cleanEmail = email.trim().toLowerCase();
    if (accounts.find((a) => a.email === cleanEmail)) {
      return 'An account with this email already exists.';
    }
    const newAccount: Account = {
      id: String(Date.now()),
      name: name.trim(),
      email: cleanEmail,
      password,
      role: 'user',
      status: 'active',
      transactionCount: 0,
    };
    setAccounts([...accounts, newAccount]);
    setUser(newAccount);
    return '';
  }

  function logout() {
    setUser(null);
  }

  function toggleAccountStatus(id: string) {
    setAccounts(
      accounts.map((a) => (a.id === id ? { ...a, status: a.status === 'active' ? 'disabled' : 'active' } : a)),
    );
  }

  function deleteAccount(id: string) {
    setAccounts(accounts.filter((a) => a.id !== id));
  }

  return (
    <AuthContext.Provider value={{ user, accounts, login, signUp, logout, toggleAccountStatus, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
