"use client";

import { Container, Typography, Box } from "@mui/material";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";

export default function AddInvoicePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: "38px" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "700" }}
        >
          Add Invoice
        </Typography>
      </Box>
      <InvoiceForm />
    </Container>
  );
}
