import * as z from 'zod';

export const authSchema = z.object({
  email: z.string().email('Please enter a valid business email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const expenseSchema = z.object({
  title: z.string().min(3, 'Title is too short'),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  category: z.string().min(1, 'Category is required'),
  teamId: z.string().min(1, 'Please assign this to a team'),
  date: z.string(),
  receiptUrl: z.string().url().optional().or(z.literal('')),
});