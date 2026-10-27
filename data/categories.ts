export const CATEGORIES = [
  { name: 'Food', icon: 'fast-food-outline', color: '#F97316' },
  { name: 'Transport', icon: 'car-outline', color: '#3B82F6' },
  { name: 'Shopping', icon: 'bag-handle-outline', color: '#EC4899' },
  { name: 'Bills', icon: 'receipt-outline', color: '#8B5CF6' },
  { name: 'Health', icon: 'medkit-outline', color: '#10B981' },
  { name: 'Entertainment', icon: 'game-controller-outline', color: '#EAB308' },
  { name: 'Other', icon: 'ellipsis-horizontal-circle-outline', color: '#64748B' },
] as const;

export function getCategory(name: string) {
  const category = CATEGORIES.find((c) => c.name === name);
  if (category) return category;
  return CATEGORIES[CATEGORIES.length - 1];
}
