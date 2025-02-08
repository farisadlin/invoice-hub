"use client";

import { Box, Stack, Avatar, useTheme, useMediaQuery } from "@mui/material";
import {
  NotificationsNone,
  KeyboardArrowDown,
  LightMode,
  Chat,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  TopbarContainer,
  MenuButton,
  ThemeToggle,
  StyledSwitch,
  IconWrapper,
  NotificationButton,
  UserInfo,
  UserName,
  UserRole,
} from "./styles/Topbar.styles";
import { TopbarProps } from "@/components/types";

export function Topbar({ onMenuClick }: TopbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TopbarContainer>
      <MenuButton onClick={onMenuClick}>
        <MenuIcon />
      </MenuButton>

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
        {!isMobile && (
          <Stack>
            <UserName>John Doe</UserName>
            <UserRole>Verified Member</UserRole>
          </Stack>
        )}
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
