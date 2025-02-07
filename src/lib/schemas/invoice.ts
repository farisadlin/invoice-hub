import { z } from "zod";

// Invoice schemas will be defined here

export const InvoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  number: z.string().min(1, "Invoice number is required"),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z.number().min(0, "Amount must be greater than or equal to 0"),
  status: z.enum(["PAID", "PENDING", "OVERDUE"], {
    required_error: "Status is required",
  }),
});

export type InvoiceFormData = z.infer<typeof InvoiceSchema>;
