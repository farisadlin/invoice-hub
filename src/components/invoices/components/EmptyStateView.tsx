"use client";

import { Typography, Button } from "@mui/material";
import { ReceiptLong as ReceiptLongIcon } from "@mui/icons-material";
import Link from "next/link";
import { EmptyState, EmptyStateIcon } from "../styles/InvoiceList.styles";
import { EmptyStateViewProps } from "@/types/components/invoice";

export function EmptyStateView({ search, status }: EmptyStateViewProps) {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <ReceiptLongIcon />
      </EmptyStateIcon>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#1E293B",
          mb: 1,
        }}
      >
        No invoices found
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#64748B",
          mb: 3,
          textAlign: "center",
        }}
      >
        {search || status
          ? "Try adjusting your search or filter to find what you're looking for."
          : "Get started by creating your first invoice."}
      </Typography>
      {!search && !status && (
        <Button
          component={Link}
          href="/invoices/add"
          variant="contained"
          sx={{
            backgroundColor: "#4F46E5",
            "&:hover": { backgroundColor: "#4338CA" },
          }}
        >
          Create Invoice
        </Button>
      )}
    </EmptyState>
  );
}
