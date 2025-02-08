import { Box, ListItemButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH } from "@/constants";
import { theme } from "@/app/theme";

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: DRAWER_WIDTH,
  height: "100vh",
  backgroundColor: "#1B2430",
  color: "white",
  padding: theme.spacing(3),
  paddingLeft: 0,
  [theme.breakpoints.up("md")]: {
    position: "fixed",
    left: 0,
    top: 0,
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const Logo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "48px",
  paddingLeft: "40px",
  [theme.breakpoints.down("md")]: {
    margin: "32px 0 0 0",
  },
  "& svg": {
    width: 32,
    height: 32,
  },
});

export const StyledListItemButton = styled(ListItemButton)<{
  "data-active"?: boolean;
}>(({ theme, "data-active": active }) => ({
  borderRadius: theme.spacing(1),
  marginLeft: "25px",
  color: active ? "white" : "#94A3B8",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
}));

export const MenuLabel = styled(Typography)({
  color: "#64748B",
  fontSize: "14px",
  fontWeight: 500,
  marginTop: "49.52px",
  marginBottom: "16px",
  paddingLeft: "40px",
});
