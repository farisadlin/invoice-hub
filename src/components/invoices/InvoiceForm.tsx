import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { InvoiceSchema, type InvoiceFormData } from "@/lib/schemas/invoice";

export function InvoiceForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      name: "",
      number: "",
      dueDate: "",
      amount: 0,
      status: "PENDING",
    },
  });

  const onSubmit = (data: InvoiceFormData) => {
    console.log(data);
    // TODO: Handle form submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Invoice Form
          </Typography>
          <Stack spacing={3}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                  fullWidth
                  placeholder="Enter your invoice name"
                />
              )}
            />

            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number"
                  error={!!errors.number}
                  helperText={errors.number?.message}
                  required
                  fullWidth
                  placeholder="Enter your invoice number"
                />
              )}
            />

            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Due Date"
                  type="date"
                  error={!!errors.dueDate}
                  helperText={errors.dueDate?.message}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  type="number"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Box component="span" sx={{ mr: 1 }}>
                        Rp
                      </Box>
                    ),
                  }}
                  placeholder="Enter your invoice amount"
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.status} required fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value="PAID">Paid</MenuItem>
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="OVERDUE">Overdue</MenuItem>
                  </Select>
                  {errors.status && (
                    <FormHelperText>{errors.status.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              + Add Invoice
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
