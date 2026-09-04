import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatPrice(price: number, currency: string = 'USD'): string {
  const rates: Record<string, number> = { USD: 1, EUR: 0.92, MAD: 10.5 };
  const rate = rates[currency] || 1;
  const symbols: Record<string, string> = { USD: '$', EUR: '€', MAD: 'د.م.' };
  const symbol = symbols[currency] || '$';
  return `${symbol}${(price * rate).toLocaleString()}`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export function debounce<A extends unknown[]>(fn: (...args: A) => void, delay: number): (...args: A) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: A) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as (...args: A) => void;
}

export function getPriceForDates(
  property: { price: number; weeklyPrice?: number; monthlyPrice?: number; cleaningFee: number; serviceFee: number },
  checkIn: string,
  checkOut: string
) {
  const nights = calculateNights(checkIn, checkOut);
  if (nights <= 0) return { nights: 0, subtotal: 0, cleaningFee: property.cleaningFee, serviceFee: property.serviceFee, total: 0 };

  let nightlyRate = property.price;
  if (nights >= 28 && property.monthlyPrice) {
    nightlyRate = property.monthlyPrice / 28;
  } else if (nights >= 7 && property.weeklyPrice) {
    nightlyRate = property.weeklyPrice / 7;
  }

  const subtotal = Math.round(nightlyRate * nights);
  const total = subtotal + property.cleaningFee + property.serviceFee;
  return { nights, subtotal, cleaningFee: property.cleaningFee, serviceFee: property.serviceFee, total };
}

export function isValidDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

export function isPastDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
}
