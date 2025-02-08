"use client";

import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { InvoicePageLayout } from "@/layouts/invoices/InvoicePageLayout";

export default function AddInvoicePage() {
  return (
    <InvoicePageLayout title="Add Invoice">
      <InvoiceForm />
    </InvoicePageLayout>
  );
}
