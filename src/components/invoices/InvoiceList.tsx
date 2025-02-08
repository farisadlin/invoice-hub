"use client";

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Menu,
  InputAdornment,
  FormControl,
  SelectChangeEvent,
  Button,
  Skeleton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  ReceiptLong as ReceiptLongIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import Link from "next/link";
import { InvoicePageLayout } from "@/layouts/invoices/InvoicePageLayout";
import { InvoiceFormFields } from "./InvoiceFormFields";
import {
  TableContainer,
  TableHeader,
  TableRow,
  MobileLabel,
  StatusChip,
  EmptyState,
  EmptyStateIcon,
  ActionButton,
  MenuList,
  MenuItemStyled,
} from "./styles/InvoiceList.styles";
import { Invoice } from "@/types/invoice";
import {
  EditableInvoice,
  HeaderActionsProps,
  InvoiceTableProps,
  EmptyStateViewProps,
} from "@/components/invoices/types";

function HeaderActions({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: HeaderActionsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "25px",
        "@media (max-width: 900px)": {
          flexDirection: "column",
          gap: "16px",
        },
      }}
    >
      <TextField
        placeholder="Search"
        value={search}
        onChange={onSearchChange}
        sx={{
          width: { xs: "100%", md: 216 },
          borderRadius: "10px",
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            height: "39.55px",
            borderRadius: "10px",
            fontSize: "12px",
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#94A3B8" }} />
            </InputAdornment>
          ),
        }}
      />
      <FormControl sx={{ width: { xs: "100%", md: 135 } }}>
        <Select
          value={status}
          onChange={onStatusChange}
          displayEmpty
          sx={{
            borderRadius: "10px",
            fontSize: "12px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="PAID">Paid</MenuItem>
          <MenuItem value="UNPAID">Unpaid</MenuItem>
          <MenuItem value="PENDING">Pending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function InvoiceTable({
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
    <Box>
      <TableHeader>
        <Box>Invoice</Box>
        <Box>Due Date</Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>Status</Box>
        <Box>Amount</Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>Actions</Box>
      </TableHeader>
      <TableContainer>
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
                  <ActionButton
                    onClick={() => handleSave(invoice)}
                    size="small"
                  >
                    <CheckIcon sx={{ fontSize: 20, color: "#219653" }} />
                  </ActionButton>
                  <ActionButton
                    onClick={() => onCancel(invoice.id)}
                    size="small"
                  >
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
    </Box>
  );
}

function EmptyStateView({ search, status }: EmptyStateViewProps) {
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

const LoadingSkeleton = () => (
  <TableContainer>
    <TableHeader>
      <Box>Invoice</Box>
      <Box>Due Date</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>Status</Box>
      <Box>Amount</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>Actions</Box>
    </TableHeader>
    {[1, 2, 3].map((index) => (
      <TableRow key={index}>
        <Box>
          <Skeleton variant="text" width={150} height={24} sx={{ mb: "3px" }} />
          <Skeleton variant="text" width={100} height={21} />
        </Box>
        <Box>
          <Skeleton variant="text" width={120} height={24} />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Skeleton
            variant="rounded"
            width={80}
            height={22}
            sx={{ display: "inline-block" }}
          />
        </Box>
        <Box>
          <Skeleton variant="text" width={150} height={24} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
      </TableRow>
    ))}
  </TableContainer>
);

export function InvoiceList() {
  const [invoices, setInvoices] = useState<EditableInvoice[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [editedInvoice, setEditedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");
    setLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      if (storedInvoices) {
        let filteredInvoices = JSON.parse(storedInvoices);

        if (search) {
          filteredInvoices = filteredInvoices.filter(
            (invoice: Invoice) =>
              invoice.name.toLowerCase().includes(search.toLowerCase()) ||
              invoice.number.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (status) {
          filteredInvoices = filteredInvoices.filter(
            (invoice: Invoice) => invoice.status === status
          );
        }

        setInvoices(filteredInvoices);
      }
      setLoading(false);
    }, 1000);
  }, [search, status]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    if (newSearch) {
      router.push(
        `/invoices/list?search=${newSearch}${status ? `&status=${status}` : ""}`
      );
    } else {
      router.push(`/invoices/list${status ? `?status=${status}` : ""}`);
    }
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value;
    if (newStatus) {
      router.push(
        `/invoices/list?status=${newStatus}${search ? `&search=${search}` : ""}`
      );
    } else {
      router.push(`/invoices/list${search ? `?search=${search}` : ""}`);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleDelete = (id?: string) => {
    const invoiceIdToDelete = id || selectedInvoice;
    if (invoiceIdToDelete) {
      // Get all invoices from local storage
      const storedInvoices = localStorage.getItem("invoices");
      const allInvoices = storedInvoices ? JSON.parse(storedInvoices) : [];

      // Remove the selected invoice
      const updatedStoredInvoices = allInvoices.filter(
        (invoice: Invoice) => invoice.id !== invoiceIdToDelete
      );

      // Update local storage with all invoices
      localStorage.setItem("invoices", JSON.stringify(updatedStoredInvoices));

      // Update the filtered view
      const updatedFilteredInvoices = invoices.filter(
        (invoice) => invoice.id !== invoiceIdToDelete
      );
      setInvoices(updatedFilteredInvoices);
      handleMenuClose();
    }
  };

  const handleEdit = (id: string) => {
    // Check if any invoice is currently being edited
    const isAnyInvoiceEditing = invoices.some((invoice) => invoice.isEditing);

    if (!isAnyInvoiceEditing) {
      setInvoices(
        invoices.map((invoice) =>
          invoice.id === id ? { ...invoice, isEditing: true } : invoice
        )
      );
    }
  };

  const handleSave = (updatedInvoice: Invoice) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === updatedInvoice.id
        ? { ...updatedInvoice, isEditing: false }
        : invoice
    );
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  const handleCancel = (id: string) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, isEditing: false } : invoice
      )
    );
  };

  const handleFieldChange = (
    field: keyof Invoice,
    value: string | number | "PAID" | "UNPAID" | "PENDING"
  ) => {
    if (editedInvoice) {
      setEditedInvoice({ ...editedInvoice, [field]: value });
    }
  };

  const headerActions = (
    <HeaderActions
      search={search}
      status={status}
      onSearchChange={handleSearchChange}
      onStatusChange={handleStatusChange}
    />
  );

  return (
    <InvoicePageLayout title="My Invoices" headerActions={headerActions}>
      {loading ? (
        <LoadingSkeleton />
      ) : invoices.length > 0 ? (
        <InvoiceTable
          invoices={invoices}
          onMenuOpen={handleMenuOpen}
          onSave={handleSave}
          onCancel={handleCancel}
          editedInvoice={editedInvoice}
          onFieldChange={handleFieldChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          setEditedInvoice={setEditedInvoice}
        />
      ) : (
        <EmptyStateView search={search} status={status} />
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            boxShadow:
              "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
            mt: 1,
          },
        }}
      >
        <MenuList>
          <MenuItemStyled
            onClick={() => {
              if (selectedInvoice) {
                const invoiceToEdit = invoices.find(
                  (inv) => inv.id === selectedInvoice
                );
                if (invoiceToEdit) {
                  setEditedInvoice(invoiceToEdit);
                  handleEdit(selectedInvoice);
                }
              }
              handleMenuClose();
            }}
            disabled={invoices.some((inv) => inv.isEditing)}
            sx={{
              "&.Mui-disabled": {
                opacity: 0.5,
                pointerEvents: "none",
              },
            }}
          >
            <Box
              component="span"
              sx={{
                color: "#1E293B",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <EditIcon sx={{ fontSize: 20 }} />
              Edit
            </Box>
          </MenuItemStyled>
          <MenuItemStyled
            onClick={() => {
              handleDelete();
              handleMenuClose();
            }}
            disabled={invoices.some((inv) => inv.isEditing)}
            sx={{
              "&.Mui-disabled": {
                opacity: 0.5,
                pointerEvents: "none",
              },
            }}
          >
            <Box
              component="span"
              sx={{
                color: "#D34053",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DeleteIcon sx={{ fontSize: 20 }} />
              Delete
            </Box>
          </MenuItemStyled>
        </MenuList>
      </Menu>
    </InvoicePageLayout>
  );
}
