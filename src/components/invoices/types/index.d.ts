import { SelectChangeEvent } from "@mui/material";

export interface EditableInvoice extends Invoice {
  isEditing?: boolean;
}

export interface HeaderActionsProps {
  search: string;
  status: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (event: SelectChangeEvent) => void;
}

export interface InvoiceTableProps {
  invoices: EditableInvoice[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  onSave: (invoice: Invoice) => void;
  onCancel: (id: string) => void;
  editedInvoice: Invoice | null;
  onFieldChange: (
    field: keyof Invoice,
    value: string | number | "PAID" | "UNPAID" | "PENDING"
  ) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  setEditedInvoice: (invoice: Invoice | null) => void;
}

export interface EmptyStateViewProps {
  search: string;
  status: string;
}

export interface Invoice {
  id: string;
  name: string;
  number: string;
  dueDate: string;
  amount: number;
  status: "PAID" | "UNPAID" | "PENDING";
}

export interface EditableInvoice extends Invoice {
  isEditing?: boolean;
}

export interface HeaderActionsProps {
  search: string;
  status: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (event: SelectChangeEvent) => void;
}

export interface InvoiceTableProps {
  invoices: EditableInvoice[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  onSave: (invoice: Invoice) => void;
  onCancel: (id: string) => void;
  editedInvoice: Invoice | null;
  onFieldChange: (
    field: keyof Invoice,
    value: string | number | "PAID" | "UNPAID" | "PENDING"
  ) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  setEditedInvoice: (invoice: Invoice | null) => void;
}

export interface EmptyStateViewProps {
  search: string;
  status: string;
}
