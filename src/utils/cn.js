import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes safely, resolving conflicts.
 * Example: cn('px-2 py-1', isError && 'text-red-500')
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}