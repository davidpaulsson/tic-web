import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return `20${dateString.slice(0, 2)}-${dateString.slice(2, 4)}-${dateString.slice(4, 6)}`;
}

export const asMoney = (value: number) => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const asNumber = (value: number) => {
  return new Intl.NumberFormat('sv-SE').format(value);
};

export const asPercentage = (value: number) => {
  return `${asNumber(Number(value.toFixed(1)))}%`;
};
