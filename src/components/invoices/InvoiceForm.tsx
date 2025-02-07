"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useForm, Controller } from "react-hook-form";
import { InvoiceSchema, type InvoiceFormData } from "@/lib/schemas/invoice";
import {
  formatCurrency,
  parseCurrency,
  generateInvoiceNumber,
} from "@/utils/format";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { format } from "date-fns";

const StyledCard = styled(Card)({
  border: "1px solid #E2E8F0",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
});

const FormTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
  color: "#1E293B",
  marginBottom: "32px",
});

const RequiredLabel = styled("span")({
  color: "#EF4444",
  marginLeft: "2px",
});

const FieldLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#1E293B",
  marginBottom: "8px",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    "& fieldset": {
      borderColor: "#E2E8F0",
    },
    "&:hover fieldset": {
      borderColor: "#CBD5E1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4F46E5",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#94A3B8",
    opacity: 1,
  },
});

const StyledSelect = styled(Select)({
  backgroundColor: "white",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E2E8F0",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#CBD5E1",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4F46E5",
  },
});

const SubmitButton = styled(Button)({
  padding: "12px 24px",
  float: "right",
  marginTop: "24px",
});

export function InvoiceForm() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      name: "",
      number: "",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      amount: 0,
      status: "PENDING",
    },
  });

  useEffect(() => {
    // Set auto-generated invoice number
    setValue("number", generateInvoiceNumber());
  }, [setValue]);

  const onSubmit = (data: InvoiceFormData) => {
    console.log({
      ...data,
      dueDate: format(new Date(data.dueDate), "yyyy-MM-dd"),
    });
    // TODO: Handle form submission
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledCard>
          <CardContent sx={{ p: 4 }}>
            <FormTitle>Invoice Form</FormTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box>
                  <FieldLabel>
                    Name<RequiredLabel>*</RequiredLabel>
                  </FieldLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <StyledTextField
                        {...field}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                        placeholder="Enter your invoice name"
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <FieldLabel>
                    Number<RequiredLabel>*</RequiredLabel>
                  </FieldLabel>
                  <Controller
                    name="number"
                    control={control}
                    render={({ field }) => (
                      <StyledTextField
                        {...field}
                        error={!!errors.number}
                        helperText={errors.number?.message}
                        fullWidth
                        disabled
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <FieldLabel>
                    Due Date<RequiredLabel>*</RequiredLabel>
                  </FieldLabel>
                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <DatePicker
                        {...field}
                        value={value ? new Date(value) : null}
                        onChange={(newValue) => {
                          onChange(
                            newValue ? format(newValue, "yyyy-MM-dd") : ""
                          );
                        }}
                        format="dd/MM/yyyy"
                        disablePast
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.dueDate,
                            helperText: errors.dueDate?.message,
                            placeholder: "DD/MM/YYYY",
                            sx: {
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                                "& fieldset": {
                                  borderColor: "#E2E8F0",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#CBD5E1",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#4F46E5",
                                },
                              },
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <FieldLabel>
                    Amount<RequiredLabel>*</RequiredLabel>
                  </FieldLabel>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <StyledTextField
                        {...field}
                        value={value ? formatCurrency(value) : ""}
                        onChange={(e) => {
                          const parsed = parseCurrency(e.target.value);
                          onChange(parsed);
                        }}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        fullWidth
                        placeholder="Enter your invoice amount"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box
                                sx={{
                                  bgcolor: "#F1F5F9",
                                  px: 2,
                                  py: 1,
                                  borderRadius: 1,
                                  color: "#64748B",
                                  mr: 1,
                                }}
                              >
                                Rp
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <FieldLabel>
                    Status<RequiredLabel>*</RequiredLabel>
                  </FieldLabel>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControl error={!!errors.status} fullWidth>
                        <StyledSelect {...field}>
                          <MenuItem value="">Choose the status</MenuItem>
                          <MenuItem value="PAID">Paid</MenuItem>
                          <MenuItem value="UNPAID">Unpaid</MenuItem>
                          <MenuItem value="PENDING">Pending</MenuItem>
                        </StyledSelect>
                        {errors.status && (
                          <FormHelperText>
                            {errors.status.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
            <SubmitButton type="submit" variant="contained" size="large">
              + Add Invoice
            </SubmitButton>
          </CardContent>
        </StyledCard>
      </Box>
    </LocalizationProvider>
  );
}
