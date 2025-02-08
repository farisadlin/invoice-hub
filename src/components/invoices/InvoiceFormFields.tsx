"use client";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Invoice } from "@/types/invoice";
import { getInvoiceFormFieldsStyles } from "./styles/InvoiceFormFields.styles";
import { formatCurrency, parseCurrency } from "@/utils/format";

interface InvoiceFormFieldsProps {
  values: Invoice;
  errors?: {
    name?: string;
    number?: string;
    dueDate?: string;
    amount?: string;
    status?: string;
  };
  onChange: (
    field: keyof Invoice,
    value: string | number | "PAID" | "UNPAID" | "PENDING"
  ) => void;
  isInline?: boolean;
}

export function InvoiceFormFields({
  values,
  errors = {},
  onChange,
  isInline = false,
}: InvoiceFormFieldsProps) {
  const theme = useTheme();
  const styles = getInvoiceFormFieldsStyles(theme);

  const handleNumberChange = (value: string) => {
    // Remove any existing INV prefix
    const cleanValue = value.replace(/^INV-?/, "");
    // Add INV- prefix
    const formattedValue = `INV-${cleanValue}`;
    onChange("number", formattedValue);
  };

  return (
    <Box
      sx={{
        ...styles.container,
        gridTemplateColumns: isInline
          ? styles.container.gridTemplateColumns.inline
          : styles.container.gridTemplateColumns.default,
      }}
    >
      <Box sx={styles.column}>
        <TextField
          label="Name"
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
        <TextField
          label="Invoice Number"
          value={values.number}
          onChange={(e) => handleNumberChange(e.target.value)}
          error={!!errors.number}
          helperText={errors.number}
          fullWidth
        />
      </Box>
      <Box sx={styles.column}>
        <DatePicker
          label="Due Date"
          value={new Date(values.dueDate)}
          onChange={(date) => {
            if (date) {
              onChange("dueDate", date.toISOString());
            }
          }}
          slotProps={{
            textField: {
              error: !!errors.dueDate,
              helperText: errors.dueDate,
              fullWidth: true,
            },
          }}
          sx={styles.datePicker}
        />
        <TextField
          label="Amount"
          value={values.amount ? formatCurrency(values.amount) : ""}
          onChange={(e) => {
            const parsed = parseCurrency(e.target.value);
            onChange("amount", parsed || 0);
          }}
          error={!!errors.amount}
          helperText={errors.amount}
          fullWidth
          InputProps={{
            startAdornment: (
              <Box component="span" sx={styles.currencyPrefix}>
                Rp
              </Box>
            ),
          }}
        />
      </Box>
      <Box>
        <FormControl fullWidth error={!!errors.status}>
          <InputLabel>Status</InputLabel>
          <Select
            value={values.status}
            label="Status"
            onChange={(e) =>
              onChange(
                "status",
                e.target.value as "PAID" | "UNPAID" | "PENDING"
              )
            }
          >
            <MenuItem value="PAID">Paid</MenuItem>
            <MenuItem value="UNPAID">Unpaid</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
