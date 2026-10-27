import { createContext, useContext, useState, type PropsWithChildren } from 'react';

import { SAMPLE_BUDGET, SAMPLE_SALARIES, SAMPLE_TRANSACTIONS, type Salary, type Transaction } from '../data/mockData';
import { currentMonth, formatMoney } from '../utils/format';

const ALERT_LEVELS = [50, 75, 100];

type CategoryTotal = {
  category: string;
  total: number;
};

type ExpensesValue = {
  transactions: Transaction[];
  salaries: Salary[];
  salary: number;
  totalSpent: number;
  budget: number;
  addTransaction: (amount: number, category: string, date: string, note: string) => string;
  editTransactionAmount: (id: string, amount: number) => void;
  deleteTransaction: (id: string) => void;
  addSalary: (amount: number) => void;
  setMonthlyBudget: (limit: number) => void;
  getCategoryTotals: () => CategoryTotal[];
};

const ExpensesContext = createContext<ExpensesValue | null>(null);

export function ExpensesProvider({ children }: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
  const [salaries, setSalaries] = useState<Salary[]>(SAMPLE_SALARIES);
  const [budget, setBudget] = useState(SAMPLE_BUDGET);
  const [alertsSent, setAlertsSent] = useState<number[]>([50]);

  const month = currentMonth();
  const newestFirst = [...transactions].sort((a, b) => (a.date < b.date ? 1 : -1));
  const monthTransactions = transactions.filter((t) => t.date.startsWith(month));

  let totalSpent = 0;
  monthTransactions.forEach((t) => {
    totalSpent += t.amount;
  });

  const salaryThisMonth = salaries.find((s) => s.month === month);
  const salary = salaryThisMonth ? salaryThisMonth.amount : 0;

  function addTransaction(amount: number, category: string, date: string, note: string): string {
    const newTransaction: Transaction = { id: String(Date.now()), amount, category, date, note };
    setTransactions([...transactions, newTransaction]);

    if (budget === 0 || !date.startsWith(month)) return '';

    const newTotal = totalSpent + amount;
    if (newTotal > budget) {
      setAlertsSent(ALERT_LEVELS);
      return `Warning: you exceeded your monthly budget by ${formatMoney(newTotal - budget)}.`;
    }

    const percent = (newTotal / budget) * 100;
    const newLevels = ALERT_LEVELS.filter((level) => percent >= level && !alertsSent.includes(level));
    if (newLevels.length === 0) return '';

    setAlertsSent([...alertsSent, ...newLevels]);
    const highest = newLevels[newLevels.length - 1];
    return `You have spent ${highest}% of your monthly budget.`;
  }

  function editTransactionAmount(id: string, amount: number) {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, amount } : t)));
  }

  function deleteTransaction(id: string) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  function addSalary(amount: number) {
    const others = salaries.filter((s) => s.month !== month);
    setSalaries([...others, { id: String(Date.now()), month, amount }]);
  }

  function setMonthlyBudget(limit: number) {
    setBudget(limit);
    const percent = (totalSpent / limit) * 100;
    setAlertsSent(ALERT_LEVELS.filter((level) => percent >= level));
  }

  function getCategoryTotals() {
    const totals: CategoryTotal[] = [];
    monthTransactions.forEach((t) => {
      const row = totals.find((r) => r.category === t.category);
      if (row) row.total += t.amount;
      else totals.push({ category: t.category, total: t.amount });
    });
    return totals.sort((a, b) => b.total - a.total);
  }

  return (
    <ExpensesContext.Provider
      value={{
        transactions: newestFirst,
        salaries: [...salaries].sort((a, b) => (a.month < b.month ? 1 : -1)),
        salary,
        totalSpent,
        budget,
        addTransaction,
        editTransactionAmount,
        deleteTransaction,
        addSalary,
        setMonthlyBudget,
        getCategoryTotals,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const value = useContext(ExpensesContext);
  if (!value) throw new Error('useExpenses must be used inside ExpensesProvider');
  return value;
}
