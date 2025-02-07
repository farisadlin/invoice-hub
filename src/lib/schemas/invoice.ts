import { z } from "zod";
import { isValid, parseISO } from "date-fns";

// Invoice schemas will be defined here

export const InvoiceSchema = z.object({
  name: z
    .string()
    .min(3, "Invoice name must be at least 3 characters")
    .max(50, "Invoice name must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9\s-]+$/,
      "Invoice name can only contain letters, numbers, spaces, and hyphens"
    ),
  number: z
    .string()
    .min(1, "Invoice number is required")
    .regex(
      /^INV-\d{8}$/,
      "Invoice number must start with 'INV-' followed by 8 digits"
    ),
  dueDate: z
    .string()
    .refine((date) => {
      if (!date) return false;
      const parsedDate = parseISO(date);
      return isValid(parsedDate);
    }, "Invalid date format")
    .refine((date) => {
      const selectedDate = parseISO(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Due date must be today or in the future"),
  amount: z
    .number()
    .min(1000, "Amount must be at least Rp 1.000")
    .max(1000000000, "Amount must be less than Rp 1.000.000.000"),
  status: z.enum(["PAID", "UNPAID", "PENDING"], {
    required_error: "Status is required",
  }),
});

export type InvoiceFormData = z.infer<typeof InvoiceSchema>;
