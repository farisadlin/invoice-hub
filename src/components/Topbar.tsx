"use client";

import {
  Box,
  IconButton,
  Stack,
  Typography,
  Avatar,
  styled,
  Switch,
} from "@mui/material";
import {
  NotificationsNone,
  KeyboardArrowDown,
  LightMode,
  Chat,
} from "@mui/icons-material";

const TopbarContainer = styled(Box)(({ theme }) => ({
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
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
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

const UserInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#F1F5F9",
  },
});

const UserName = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#212B36",
  textAlign: "right",
});

const UserRole = styled(Typography)({
  fontSize: "12px",
  color: "#637381",
  textAlign: "right",
  fontWeight: 600,
  marginBottom: "1px",
});

const NotificationButton = styled(IconButton)({
  width: 34,
  height: 34,
  backgroundColor: "#F8FAFC",
  "&:hover": {
    backgroundColor: "#F1F5F9",
  },
});

const IconWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "15px",
});

const ThemeToggle = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export function Topbar() {
  return (
    <TopbarContainer>
      <ThemeToggle>
        <LightMode sx={{ color: "#64748B", fontSize: 20 }} />
        <StyledSwitch />
      </ThemeToggle>

      <IconWrapper>
        <NotificationButton>
          <NotificationsNone sx={{ color: "#64748B", fontSize: 20 }} />
        </NotificationButton>
        <NotificationButton>
          <Chat sx={{ color: "#64748B", fontSize: 20 }} />
          <Box
            sx={{
              width: 6,
              height: 6,
              backgroundColor: "#EF4444",
              borderRadius: "50%",
              position: "absolute",
              top: 8,
              right: 8,
            }}
          />
        </NotificationButton>
      </IconWrapper>

      <UserInfo>
        <Stack>
          <UserName>John Doe</UserName>
          <UserRole>Verified Member</UserRole>
        </Stack>
        <Avatar
          src="/assets/avatar.png"
          alt="User Avatar"
          sx={{ width: 44, height: 44 }}
        />
        <KeyboardArrowDown sx={{ color: "#64748B", fontSize: 20 }} />
      </UserInfo>
    </TopbarContainer>
  );
}
