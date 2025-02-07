"use client";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { Add as AddIcon, ViewList as ViewListIcon } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  height: "100vh",
  backgroundColor: "#1B2430",
  color: "white",
  padding: theme.spacing(3),
  position: "fixed",
  left: 0,
  top: 0,
}));

const Logo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "48px",
  "& svg": {
    width: 32,
    height: 32,
  },
});

const StyledListItemButton = styled(ListItemButton)<{ active?: boolean }>(
  ({ theme, active }) => ({
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: active ? "white" : "#94A3B8",
    backgroundColor: active ? "rgba(255, 255, 255, 0.08)" : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
  })
);

const MenuLabel = styled(Typography)({
  color: "#64748B",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "16px",
});

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Add Invoice",
      icon: <AddIcon />,
      href: "/invoices/add",
    },
    {
      label: "My Invoices",
      icon: <ViewListIcon />,
      href: "/invoices/list",
    },
  ];

  return (
    <SidebarContainer>
      <Logo>
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
        </svg>
        <Typography variant="h6" fontWeight="bold">
          InvoiceHub
        </Typography>
      </Logo>

      <MenuLabel>MENU</MenuLabel>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <Link
              href={item.href}
              style={{ width: "100%", textDecoration: "none" }}
            >
              <StyledListItemButton active={pathname === item.href}>
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: pathname === item.href ? 600 : 400,
                  }}
                />
              </StyledListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
}
