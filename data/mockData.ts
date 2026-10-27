import { currentMonth, dayOfThisMonth, previousMonth } from '../utils/format';

export type Transaction = {
  id: string;
  amount: number;
  category: string;
  date: string;
  note: string;
};

export type Salary = {
  id: string;
  month: string;
  amount: number;
};

export type Account = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  status: 'active' | 'disabled';
  transactionCount: number;
};

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  { id: '1', amount: 1200, category: 'Bills', date: dayOfThisMonth(1), note: 'Electricity and internet' },
  { id: '2', amount: 450, category: 'Food', date: dayOfThisMonth(3), note: 'Groceries' },
  { id: '3', amount: 150, category: 'Transport', date: dayOfThisMonth(5), note: 'Uber to university' },
  { id: '4', amount: 650, category: 'Shopping', date: dayOfThisMonth(8), note: 'New shoes' },
  { id: '5', amount: 220, category: 'Entertainment', date: dayOfThisMonth(10), note: 'Cinema' },
  { id: '6', amount: 280, category: 'Health', date: dayOfThisMonth(12), note: 'Pharmacy' },
  { id: '7', amount: 300, category: 'Food', date: dayOfThisMonth(15), note: 'Dinner with friends' },
];

export const SAMPLE_SALARIES: Salary[] = [
  { id: '1', month: currentMonth(), amount: 15000 },
  { id: '2', month: previousMonth(), amount: 15000 },
];

export const SAMPLE_BUDGET = 6000;

export const SAMPLE_ACCOUNTS: Account[] = [
  { id: 'a1', name: 'Admin', email: 'admin@masroofy.com', password: 'admin123', role: 'admin', status: 'active', transactionCount: 0 },
  { id: 'u1', name: 'Omar Hassan', email: 'user@masroofy.com', password: '123456', role: 'user', status: 'active', transactionCount: 7 },
  { id: 'u2', name: 'Salma Adel', email: 'salma@mail.com', password: '123456', role: 'user', status: 'active', transactionCount: 42 },
  { id: 'u3', name: 'Youssef Nabil', email: 'youssef@mail.com', password: '123456', role: 'user', status: 'active', transactionCount: 27 },
  { id: 'u4', name: 'Mariam Khaled', email: 'mariam@mail.com', password: '123456', role: 'user', status: 'disabled', transactionCount: 3 },
  { id: 'u5', name: 'Karim Ehab', email: 'karim@mail.com', password: '123456', role: 'user', status: 'active', transactionCount: 15 },
];
