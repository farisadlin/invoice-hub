export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const parseCurrency = (value: string): number => {
  const parsed = Number(value.replace(/[^\d]/g, ""));
  return isNaN(parsed) ? 0 : parsed;
};
