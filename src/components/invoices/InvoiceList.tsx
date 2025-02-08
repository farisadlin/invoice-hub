"use client";

import { Box, Menu, SelectChangeEvent } from "@mui/material";
import {
  Edit as EditIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { InvoicePageLayout } from "@/layout/invoices/InvoicePageLayout";
import { MenuList, MenuItemStyled } from "./styles/InvoiceList.styles";
import { Invoice } from "./types";
import { EditableInvoice } from "@/components/invoices/types";
import { HeaderActions } from "@/components/invoices/HeaderActions";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { EmptyStateView } from "@/components/invoices/EmptyStateView";
import { LoadingSkeleton } from "@/components/invoices/LoadingSkeleton";
import { STORAGE_KEY } from "@/constants";

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
    const storedInvoices = localStorage.getItem(STORAGE_KEY);
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
      const storedInvoices = localStorage.getItem(STORAGE_KEY);
      const allInvoices = storedInvoices ? JSON.parse(storedInvoices) : [];

      // Remove the selected invoice
      const updatedStoredInvoices = allInvoices.filter(
        (invoice: Invoice) => invoice.id !== invoiceIdToDelete
      );

      // Update local storage with all invoices
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStoredInvoices));

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInvoices));
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
