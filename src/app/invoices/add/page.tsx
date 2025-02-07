"use client";

import { Container, Typography, Box } from "@mui/material";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";

export default function AddInvoicePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Invoice
        </Typography>
      </Box>
      <InvoiceForm />
    </Container>
  );
}
