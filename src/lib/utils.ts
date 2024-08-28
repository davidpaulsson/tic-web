import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return `20${dateString.slice(0, 2)}-${dateString.slice(2, 4)}-${dateString.slice(4, 6)}`;
}
