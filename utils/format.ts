export function formatMoney(amount: number): string {
  return 'EGP ' + amount.toLocaleString('en-US');
}

function twoDigits(n: number): string {
  return n < 10 ? '0' + n : String(n);
}

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${twoDigits(d.getMonth() + 1)}-${twoDigits(d.getDate())}`;
}

export function currentMonth(): string {
  return today().slice(0, 7);
}

export function previousMonth(): string {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - 1);
  return `${d.getFullYear()}-${twoDigits(d.getMonth() + 1)}`;
}

export function monthName(month: string): string {
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const parts = month.split('-');
  return `${names[Number(parts[1]) - 1]} ${parts[0]}`;
}

export function dayOfThisMonth(day: number): string {
  const todayDay = new Date().getDate();
  return `${currentMonth()}-${twoDigits(Math.min(day, todayDay))}`;
}

export function isValidDate(text: string): boolean {
  const parts = text.split('-');
  if (parts.length !== 3 || parts[0].length !== 4 || parts[1].length !== 2 || parts[2].length !== 2) return false;

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (month < 1 || month > 12 || day < 1) return false;

  const daysInMonth = new Date(year, month, 0).getDate();
  return day <= daysInMonth;
}
