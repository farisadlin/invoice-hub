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
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AddCircleOutline, FormatListBulleted } from "@mui/icons-material";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  height: "100vh",
  backgroundColor: "#1B2430",
  color: "white",
  padding: theme.spacing(3),
  paddingLeft: 0,
  position: "fixed",
  left: 0,
  top: 0,
}));

const Logo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "48px",
  paddingLeft: "40px",
  "& svg": {
    width: 32,
    height: 32,
  },
});

const StyledListItemButton = styled(ListItemButton)<{ active?: boolean }>(
  ({ theme, active }) => ({
    borderRadius: theme.spacing(1),
    marginLeft: "25px",
    color: active ? "white" : "#94A3B8",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
  })
);

const MenuLabel = styled(Typography)({
  color: "#64748B",
  fontSize: "14px",
  fontWeight: 500,
  marginTop: "49.52px",
  marginBottom: "16px",
  paddingLeft: "40px",
});

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Add Invoice",
      icon: <AddCircleOutline sx={{ fontSize: 18 }} />,
      href: "/invoices/add",
    },
    {
      label: "My Invoices",
      icon: <FormatListBulleted sx={{ fontSize: 18 }} />,
      href: "/invoices/list",
    },
  ];

  return (
    <SidebarContainer>
      <Logo>
        <Image
          src="/assets/invoice-hub-logo.svg"
          alt="InvoiceHub Logo"
          width={166}
          height={46}
        />
      </Logo>

      <MenuLabel>MENU</MenuLabel>
      <List sx={{ padding: 0 }}>
        {menuItems.map((item, index) => (
          <ListItem
            key={item.href}
            disablePadding
            sx={{
              marginBottom: index === menuItems.length - 1 ? 0 : undefined, // Remove margin from last item
            }}
          >
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
