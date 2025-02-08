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
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  ReceiptLong as ReceiptLongIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import Link from "next/link";
import { InvoicePageLayout } from "@/layouts/invoices/InvoicePageLayout";

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

interface Invoice {
  id: string;
  name: string;
  number: string;
  dueDate: string;
  amount: number;
  status: "PAID" | "UNPAID" | "PENDING";
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
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        placeholder="Search"
        value={search}
        onChange={onSearchChange}
        sx={{
          width: 216,
          backgroundColor: "white",
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
            backgroundColor: "white",
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
  invoices: Invoice[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void;
}

function InvoiceTable({ invoices, onMenuOpen }: InvoiceTableProps) {
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
                invoice.status.charAt(0) + invoice.status.slice(1).toLowerCase()
              }
              status={invoice.status}
            />
          </Box>
          <Box sx={{ color: "#1E293B" }}>
            Rp {formatCurrency(invoice.amount)}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton size="small" onClick={(e) => onMenuOpen(e, invoice.id)}>
              <MenuIcon />
            </IconButton>
          </Box>
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

export function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");
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
      {invoices.length > 0 ? (
        <InvoiceTable invoices={invoices} onMenuOpen={handleMenuOpen} />
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
      >
        <MenuItem onClick={handleDelete} sx={{ color: "#EF4444" }}>
          Delete
        </MenuItem>
      </Menu>
    </InvoicePageLayout>
  );
}
