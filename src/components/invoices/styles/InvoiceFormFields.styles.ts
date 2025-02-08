import { Theme } from "@mui/material/styles";

export const getInvoiceFormFieldsStyles = (theme: Theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: {
      inline: {
        xs: "1fr",
        md: "1fr 1fr 1fr",
      },
      default: "1fr",
    },
    gap: 2,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  datePicker: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  currencyPrefix: {
    color: theme.palette.text.secondary,
    marginRight: "4px",
  },
});
