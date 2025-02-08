"use client";

import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { formatCurrency, parseCurrency } from "@/utils/format";

const FieldLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#1E293B",
  marginBottom: "8px",
});

const RequiredLabel = styled("span")({
  color: "#EF4444",
  marginLeft: "4px",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderRadius: "4px",
    "& fieldset": {
      borderColor: "#E2E8F0",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#CBD5E1",
      borderWidth: "1.5px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4F46E5",
      borderWidth: "1.5px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "13px 22px",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#94A3B8",
    opacity: 1,
  },
});

const StyledSelect = styled(Select)({
  backgroundColor: "white",
  borderRadius: "4px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E2E8F0",
    borderWidth: "1.5px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#CBD5E1",
    borderWidth: "1.5px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4F46E5",
    borderWidth: "1.5px",
  },
  "& .MuiSelect-select": {
    padding: "13px 22px",
  },
});

interface InvoiceFormFieldsProps {
  values: {
    name: string;
    number: string;
    dueDate: string;
    amount: number;
    status: "PAID" | "UNPAID" | "PENDING";
  };
  errors?: {
    name?: string;
    number?: string;
    dueDate?: string;
    amount?: string;
    status?: string;
  };
  onChange: (
    field: "name" | "number" | "dueDate" | "amount" | "status",
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
  const handleNumberChange = (value: string) => {
    // Remove any existing INV prefix
    value = value.replace(/^INV/, "");
    // Remove any non-digit characters
    value = value.replace(/\D/g, "");
    // Add INV prefix back
    onChange("number", `INV${value}`);
  };

  const handleAmountChange = (value: string) => {
    const parsed = parseCurrency(value);
    if (typeof parsed === "number") {
      onChange("amount", parsed);
    }
  };

  const handleDateChange = (newValue: Date | null) => {
    if (newValue instanceof Date) {
      onChange("dueDate", format(newValue, "yyyy-MM-dd"));
    }
  };

  const gridStyles = isInline
    ? {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 2,
        alignItems: "flex-start",
      }
    : {
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 3,
      };

  return (
    <Box sx={gridStyles}>
      <Box>
        {!isInline && (
          <FieldLabel>
            Name<RequiredLabel>*</RequiredLabel>
          </FieldLabel>
        )}
        <StyledTextField
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          placeholder="Enter your invoice name"
          size={isInline ? "small" : "medium"}
        />
        {isInline && (
          <StyledTextField
            value={values.number}
            onChange={(e) => handleNumberChange(e.target.value)}
            error={!!errors.number}
            helperText={errors.number}
            fullWidth
            placeholder="Enter your invoice number"
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </Box>

      {!isInline && (
        <Box>
          <FieldLabel>
            Number<RequiredLabel>*</RequiredLabel>
          </FieldLabel>
          <StyledTextField
            value={values.number}
            onChange={(e) => handleNumberChange(e.target.value)}
            error={!!errors.number}
            helperText={errors.number}
            fullWidth
            placeholder="Enter your invoice number"
          />
        </Box>
      )}

      <Box>
        {!isInline && (
          <FieldLabel>
            Due Date<RequiredLabel>*</RequiredLabel>
          </FieldLabel>
        )}
        <DatePicker
          value={values.dueDate ? new Date(values.dueDate) : null}
          onChange={handleDateChange}
          format="dd/MM/yyyy"
          disablePast
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!errors.dueDate,
              helperText: errors.dueDate,
              placeholder: "DD/MM/YYYY",
              size: isInline ? "small" : "medium",
              sx: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "4px",
                  "& fieldset": {
                    borderColor: "#E2E8F0",
                    borderWidth: "1.5px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CBD5E1",
                    borderWidth: "1.5px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4F46E5",
                    borderWidth: "1.5px",
                  },
                },
              },
            },
          }}
        />
      </Box>

      <Box>
        {!isInline && (
          <FieldLabel>
            Status<RequiredLabel>*</RequiredLabel>
          </FieldLabel>
        )}
        <FormControl fullWidth error={!!errors.status}>
          <StyledSelect
            value={values.status}
            onChange={(e) =>
              onChange(
                "status",
                e.target.value as "PAID" | "UNPAID" | "PENDING"
              )
            }
            displayEmpty
            size={isInline ? "small" : "medium"}
          >
            <MenuItem value="" disabled>
              <Typography sx={{ color: "#94A3B8" }}>
                Choose the status
              </Typography>
            </MenuItem>
            <MenuItem value="PAID">Paid</MenuItem>
            <MenuItem value="UNPAID">Unpaid</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
          </StyledSelect>
        </FormControl>
      </Box>

      <Box>
        {!isInline && (
          <FieldLabel>
            Amount<RequiredLabel>*</RequiredLabel>
          </FieldLabel>
        )}
        <StyledTextField
          value={values.amount ? formatCurrency(values.amount) : ""}
          onChange={(e) => handleAmountChange(e.target.value)}
          error={!!errors.amount}
          helperText={errors.amount}
          fullWidth
          placeholder="Enter your invoice amount"
          size={isInline ? "small" : "medium"}
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#D9D9D9",
                  border: "1px solid #E2E8F0",
                  borderTopLeftRadius: "4px",
                  borderBottomLeftRadius: "4px",
                  color: "#64748B",
                  width: "40px",
                  zIndex: 1,
                }}
              >
                Rp
              </Box>
            ),
          }}
          sx={{
            "& .MuiInputBase-input": {
              marginLeft: "10px",
            },
          }}
        />
      </Box>
    </Box>
  );
}
