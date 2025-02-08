import { z } from "zod";
import { isValid, parseISO } from "date-fns";

// Invoice schemas will be defined here

export const InvoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  number: z
    .string()
    .min(1, "Invoice number is required")
    .regex(
      /^INV\d+$/,
      "Invoice number must start with 'INV' followed by numbers"
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
  amount: z.number().min(1, "Amount is required"),
  status: z.enum(["PAID", "UNPAID", "PENDING"], {
    required_error: "Status is required",
  }),
});

export type InvoiceFormData = z.infer<typeof InvoiceSchema>;
