"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useForm, Controller } from "react-hook-form";
import { InvoiceSchema, type InvoiceFormData } from "@/lib/schemas/invoice";
import { formatCurrency, parseCurrency } from "@/utils/format";
import { format } from "date-fns";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { STORAGE_KEY } from "@/constants";
import {
  StyledCard,
  FormTitle,
  FieldLabel,
  RequiredLabel,
  StyledTextField,
  StyledSelect,
  SubmitButton,
} from "./styles/InvoiceForm.styles";

const getStoredInvoices = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const storeInvoice = (invoice: InvoiceFormData) => {
  const invoices = getStoredInvoices();
  const newInvoice = {
    ...invoice,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...invoices, newInvoice]));
};

export function InvoiceForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      name: "",
      number: "",
      dueDate: "",
      amount: 0,
      status: undefined,
    },
  });

  const onSubmit = async (data: InvoiceFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const formattedData = {
      ...data,
      dueDate: format(new Date(data.dueDate), "yyyy-MM-dd"),
    };

    // Store the invoice in local storage
    storeInvoice(formattedData);

    // Show success message and reset form
    setOpen(true);
    reset();
    setIsSubmitting(false);

    // Hide success message after 6 seconds
    setTimeout(() => {
      setOpen(false);
    }, 6000);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledCard>
          <CardContent sx={{ py: "15px", px: "26px" }}>
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
                        onFocus={(e) => {
                          if (!e.target.value) {
                            field.onChange("INV");
                          }
                        }}
                        onChange={(e) => {
                          let value = e.target.value;
                          // Remove any existing INV prefix
                          value = value.replace(/^INV/, "");
                          // Remove any non-digit characters
                          value = value.replace(/\D/g, "");
                          // Add INV prefix back
                          field.onChange(`INV${value}`);
                        }}
                        error={!!errors.number}
                        helperText={errors.number?.message}
                        fullWidth
                        placeholder="Enter your invoice number"
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
                            inputProps: {
                              readOnly: true,
                            },
                            sx: {
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                                borderRadius: "4px",
                                cursor: "pointer",
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
                                  cursor: "pointer",
                                },
                              },
                            },
                          },
                          popper: {
                            sx: {
                              "& .MuiPaper-root": {
                                width: "100%",
                                "& .MuiCalendarPicker-root": {
                                  width: "100%",
                                  maxWidth: "none",
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
                          onChange(parsed || 0);
                        }}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        fullWidth
                        placeholder="Enter your invoice amount"
                        slotProps={{
                          input: {
                            style: {
                              paddingLeft: "80px",
                            },
                          },
                        }}
                        sx={{
                          "& .MuiInputBase-root": {
                            position: "relative",
                            "&::before": {
                              content: '"Rp"',
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
                              width: "81px",
                              zIndex: 1,
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
                    Status<RequiredLabel>*</RequiredLabel>
                  </FieldLabel>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { value, ...field } }) => (
                      <FormControl error={!!errors.status} fullWidth>
                        <StyledSelect
                          {...field}
                          value={value || ""}
                          displayEmpty
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
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <SubmitButton
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress
                      size={16}
                      thickness={4}
                      sx={{ color: "white", mr: 1 }}
                    />
                    Adding Invoice...
                  </>
                ) : (
                  "+ Add Invoice"
                )}
              </SubmitButton>
            </Box>
          </CardContent>
        </StyledCard>
        {open && (
          <Alert
            icon={false}
            sx={{
              mt: "38px",
              backgroundColor: "#ECFDF5",
              color: "#004434",
              borderRadius: "4px",
              borderLeft: "8px solid #34D399",
              height: "115px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& .MuiAlert-message": {
                width: "100%",
                textAlign: "center",
              },
            }}
          >
            <Box
              sx={{
                textAlign: "left",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 22,
                  height: 22,
                  bgcolor: "#34D399",
                  borderRadius: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  mt: "2px",
                }}
              >
                <CheckIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "16px", mb: "8px" }}
                >
                  Invoice added successfully!
                </Typography>
                <Typography sx={{ color: "#637381" }}>
                  You can view and manage your invoice in the &apos;My
                  Invoices&apos; section.
                </Typography>
              </Box>
            </Box>
          </Alert>
        )}
      </Box>
    </LocalizationProvider>
  );
}
