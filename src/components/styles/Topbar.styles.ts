import { Box, IconButton, Typography, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TopbarContainer = styled(Box)(({ theme }) => ({
  height: 80,
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  borderBottom: "1px solid #E2E8F0",
  padding: theme.spacing(2, 4),
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(3),
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
  width: "100%",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  flex: "0 0 auto",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
}));

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 44,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#4F46E5",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#4F46E5",
      border: "6px solid #fff",
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E2E8F0",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const UserInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#F1F5F9",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiTypography-root": {
      display: "none",
    },
  },
}));

export const UserName = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#212B36",
  textAlign: "right",
});

export const UserRole = styled(Typography)({
  fontSize: "12px",
  color: "#637381",
  textAlign: "right",
  fontWeight: 600,
  marginBottom: "1px",
});

export const NotificationButton = styled(IconButton)({
  width: 34,
  height: 34,
  backgroundColor: "#F8FAFC",
  "&:hover": {
    backgroundColor: "#F1F5F9",
  },
});

export const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  [theme.breakpoints.down("sm")]: {
    gap: "8px",
  },
}));

export const ThemeToggle = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    marginRight: "auto",
  },
}));
