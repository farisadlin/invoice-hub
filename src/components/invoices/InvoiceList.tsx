"use client";

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Menu,
  Chip,
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
import { styled } from "@mui/material/styles";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import Link from "next/link";
import { InvoicePageLayout } from "@/layouts/invoices/InvoicePageLayout";
import { InvoiceFormFields } from "./InvoiceFormFields";

const TableContainer = styled(Box)({
  backgroundColor: "white",
  borderRadius: "0",
  border: "1px solid #E2E8F0",
  overflow: "hidden",
  padding: "30px",
});

const TableHeader = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  padding: "16px 24px",
  backgroundColor: "#F7F9FC",
  "& > *": {
    color: "#1C2434",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
});

const TableRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  padding: "16px 24px",
  alignItems: "center",
  borderBottom: "1px solid #E2E8F0",
  "&:last-child": {
    borderBottom: "none",
  },
});

const StatusChip = styled(Chip)<{ status: "PAID" | "UNPAID" | "PENDING" }>(
  ({ status }) => ({
    borderRadius: "16px",
    height: "22px",
    fontSize: "14px",
    padding: "14px 4px",
    fontWeight: 500,
    ...(status === "PAID" && {
      backgroundColor: "rgba(33, 150, 83, 0.08)",
      color: "#219653",
    }),
    ...(status === "UNPAID" && {
      backgroundColor: "rgba(211, 64, 83, 0.08)",
      color: "#D34053",
    }),
    ...(status === "PENDING" && {
      backgroundColor: "rgba(255, 167, 11, 0.08)",
      color: "#FFA70B",
    }),
  })
);

const EmptyState = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "64px 24px",
  backgroundColor: "white",
  borderRadius: "8px",
  border: "1px solid #E2E8F0",
});

const EmptyStateIcon = styled(Box)({
  width: 48,
  height: 48,
  borderRadius: "50%",
  backgroundColor: "#F1F5F9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
  "& svg": {
    color: "#64748B",
    fontSize: 24,
  },
});

const ActionButton = styled(IconButton)({
  padding: "4px",
  "&:hover": {
    backgroundColor: "#F1F5F9",
  },
});

const MenuList = styled("ul")({
  padding: "8px",
  minWidth: "120px",
});

const MenuItemStyled = styled(MenuItem)({
  borderRadius: "6px",
  padding: "8px 12px",
  gap: "8px",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "#F1F5F9",
  },
});

interface Invoice {
  id: string;
  name: string;
  number: string;
  dueDate: string;
  amount: number;
  status: "PAID" | "UNPAID" | "PENDING";
}

interface EditableInvoice extends Invoice {
  isEditing?: boolean;
}

interface HeaderActionsProps {
  search: string;
  status: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (event: SelectChangeEvent) => void;
}

function HeaderActions({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: HeaderActionsProps) {
  return (
    <Box sx={{ display: "flex", columnGap: "25px" }}>
      <TextField
        placeholder="Search"
        value={search}
        onChange={onSearchChange}
        sx={{
          width: 216,
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
      <FormControl sx={{ width: 135 }}>
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

interface InvoiceTableProps {
  invoices: EditableInvoice[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  onSave: (invoice: Invoice) => void;
  onCancel: (id: string) => void;
  editedInvoice: Invoice | null;
  onFieldChange: (
    field: keyof Invoice,
    value: string | number | "PAID" | "UNPAID" | "PENDING"
  ) => void;
}

function InvoiceTable({
  invoices,
  onMenuOpen,
  onSave,
  onCancel,
  editedInvoice,
  onFieldChange,
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
              <Box sx={{ gridColumn: "1 / -2" }}>
                <InvoiceFormFields
                  values={editedInvoice || invoice}
                  onChange={onFieldChange}
                  isInline
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
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
              <Box sx={{ color: "#1E293B" }}>
                {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <StatusChip
                  label={
                    invoice.status.charAt(0) +
                    invoice.status.slice(1).toLowerCase()
                  }
                  status={invoice.status}
                />
              </Box>
              <Box sx={{ color: "#1E293B" }}>
                Rp {formatCurrency(invoice.amount)}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <ActionButton
                  onClick={(e) => onMenuOpen(e, invoice.id)}
                  size="small"
                >
                  <MenuIcon sx={{ fontSize: 20 }} />
                </ActionButton>
              </Box>
            </>
          )}
        </TableRow>
      ))}
    </TableContainer>
  );
}

interface EmptyStateViewProps {
  search: string;
  status: string;
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
          <Skeleton variant="text" width={100} height={24} />
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
    }, 3000);
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

  const handleDelete = () => {
    if (selectedInvoice) {
      const updatedInvoices = invoices.filter(
        (invoice) => invoice.id !== selectedInvoice
      );
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
      setInvoices(updatedInvoices);
      handleMenuClose();
    }
  };

  const handleEdit = (id: string) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, isEditing: true } : invoice
      )
    );
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
