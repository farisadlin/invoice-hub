import { useState } from "react";
import type { Invoice } from "../lib/types/invoice";

export function useInvoice() {
  const [loading, setLoading] = useState(false);

  // Invoice-related logic will be implemented here

  return {
    loading,
  };
}
