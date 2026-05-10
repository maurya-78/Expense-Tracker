import * as z from 'zod';

/**
 * Auth Schema - For Login and Registration
 */
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid business email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

/**
 * Expense Schema - For tracking burn rate
 */
export const expenseSchema = z.object({
  title: z.string().min(3, 'Title is too short'),
  // .coerce ensures that if the input is a string from a form, it becomes a number
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number" })
    .positive('Amount must be greater than zero'),
  category: z.string().min(1, 'Category is required'),
  // Validates that it's a valid MongoID string (standard for MERN)
  teamId: z.string().min(1, 'Please assign this to a team'),
  // Validates the date string format
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  // Handles optional URLs properly
  receiptUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
});

/**
 * Team/Startup Profile Schema
 */
export const teamSchema = z.object({
  name: z.string().min(2, 'Team name is required'),
  monthlyBudget: z.coerce.number().nonnegative('Budget cannot be negative'),
  currency: z.enum(['INR', 'USD', 'EUR']).default('INR'),
});