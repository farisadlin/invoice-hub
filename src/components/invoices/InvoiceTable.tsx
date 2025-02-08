"use client";

import { Box, Typography } from "@mui/material";
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  DeleteOutline as DeleteIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/format";
import { InvoiceFormFields } from "./InvoiceFormFields";
import {
  TableContainer,
  TableHeader,
  TableRow,
  MobileLabel,
  StatusChip,
  ActionButton,
} from "./styles/InvoiceList.styles";
import {
  EditableInvoice,
  InvoiceTableProps,
} from "@/components/invoices/types";

export function InvoiceTable({
  invoices,
  onMenuOpen,
  onSave,
  onCancel,
  editedInvoice,
  onFieldChange,
  onEdit,
  onDelete,
  setEditedInvoice,
}: InvoiceTableProps) {
  const handleSave = (invoice: EditableInvoice) => {
    if (editedInvoice) {
      const savedInvoice = {
        ...invoice,
        ...editedInvoice,
      };
      onSave(savedInvoice);
    }
  };

  return (
    <TableContainer>
      <TableHeader>
        <Box>Invoice</Box>
        <Box>Due Date</Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>Status</Box>
        <Box>Amount</Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>Actions</Box>
      </TableHeader>
      {invoices.map((invoice) => (
        <TableRow key={invoice.id}>
          {invoice.isEditing ? (
            <>
              <Box
                sx={{
                  gridColumn: { xs: "1", md: "1 / -2" },
                  mb: { xs: 2, md: 0 },
                }}
              >
                <InvoiceFormFields
                  values={editedInvoice || invoice}
                  onChange={onFieldChange}
                  isInline
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "center" },
                  gap: 1,
                  mt: { xs: 2, md: 0 },
                }}
              >
                <ActionButton onClick={() => handleSave(invoice)} size="small">
                  <CheckIcon sx={{ fontSize: 20, color: "#219653" }} />
                </ActionButton>
                <ActionButton onClick={() => onCancel(invoice.id)} size="small">
                  <CloseIcon sx={{ fontSize: 20, color: "#D34053" }} />
                </ActionButton>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <MobileLabel>Invoice Details</MobileLabel>
                <Typography
                  sx={{
                    fontWeight: 400,
                    color: "#1C2434",
                    fontSize: "16px",
                    mb: "3px",
                  }}
                >
                  {invoice.name}
                </Typography>
                <Typography sx={{ color: "#64748B", fontSize: "14px" }}>
                  {invoice.number}
                </Typography>
              </Box>
              <Box>
                <MobileLabel>Due Date</MobileLabel>
                <Typography sx={{ color: "#1E293B" }}>
                  {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: { xs: "left", md: "center" },
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                  justifyContent: { md: "center" },
                }}
              >
                <MobileLabel>Status</MobileLabel>
                <StatusChip
                  label={
                    invoice.status.charAt(0) +
                    invoice.status.slice(1).toLowerCase()
                  }
                  status={invoice.status}
                />
              </Box>
              <Box>
                <MobileLabel>Amount</MobileLabel>
                <Typography sx={{ color: "#1E293B", fontSize: "16px" }}>
                  Rp {formatCurrency(invoice.amount)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "flex-start", md: "center" },
                  gap: 1,
                }}
              >
                <Box>
                  <MobileLabel>Actions</MobileLabel>
                  <ActionButton
                    onClick={(e) => onMenuOpen(e, invoice.id)}
                    size="small"
                    sx={{ display: { xs: "none", md: "inline-flex" } }}
                  >
                    <MenuIcon sx={{ fontSize: 20 }} />
                  </ActionButton>
                </Box>
                <Box
                  sx={{
                    display: { xs: "flex", md: "none" },
                    gap: 1,
                  }}
                >
                  <ActionButton
                    onClick={() => {
                      const invoiceToEdit = invoices.find(
                        (inv) => inv.id === invoice.id
                      );
                      if (invoiceToEdit) {
                        setEditedInvoice(invoiceToEdit);
                        onEdit(invoice.id);
                      }
                    }}
                    size="small"
                    disabled={invoices.some((inv) => inv.isEditing)}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.5,
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <EditIcon sx={{ fontSize: 20, color: "#1E293B" }} />
                  </ActionButton>
                  <ActionButton
                    onClick={() => onDelete(invoice.id)}
                    size="small"
                    disabled={invoices.some((inv) => inv.isEditing)}
                    sx={{
                      "&.Mui-disabled": {
                        opacity: 0.5,
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 20, color: "#D34053" }} />
                  </ActionButton>
                </Box>
              </Box>
            </>
          )}
        </TableRow>
      ))}
    </TableContainer>
  );
}
