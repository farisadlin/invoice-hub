import { Box, Chip, IconButton, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TableContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "0",
  border: "1px solid #E2E8F0",
  overflow: "hidden",
  padding: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "15px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const TableHeader = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
export const TableRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  padding: "16px 24px",
  alignItems: "center",
  borderBottom: "1px solid #E2E8F0",
  backgroundColor: "white",
  [theme.breakpoints.up("md")]: {
    "&:last-child": {
      borderBottom: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "12px",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    borderBottom: "1px solid #E2E8F0",
    "&:last-child": {
      borderBottom: "1px solid #E2E8F0",
    },
    "& > *:not(:first-child)": {
      paddingLeft: "0",
    },
  },
}));

export const MobileLabel = styled(Box)(({ theme }) => ({
  display: "none",
  color: "#64748B",
  fontSize: "12px",
  fontWeight: 500,
  marginBottom: "4px",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const StatusChip = styled(Chip)<{
  status: "PAID" | "UNPAID" | "PENDING";
}>(({ status }) => ({
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
}));

export const EmptyState = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "64px 24px",
  backgroundColor: "white",
  borderRadius: "8px",
  border: "1px solid #E2E8F0",
});

export const EmptyStateIcon = styled(Box)({
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

export const ActionButton = styled(IconButton)({
  padding: "4px",
  "&:hover": {
    backgroundColor: "#F1F5F9",
  },
});

export const MenuList = styled("ul")({
  padding: "8px",
  minWidth: "120px",
});

export const MenuItemStyled = styled(MenuItem)({
  borderRadius: "6px",
  padding: "8px 12px",
  gap: "8px",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "#F1F5F9",
  },
});
