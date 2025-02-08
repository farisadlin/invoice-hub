"use client";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AddCircleOutline, FormatListBulleted } from "@mui/icons-material";
import { DRAWER_WIDTH } from "@/constants";
import {
  Logo,
  MenuLabel,
  StyledListItemButton,
  SidebarContainer,
} from "./styles/Sidebar.styles";
import { SidebarProps } from "@/components/types";

export function Sidebar({ isMobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const sidebarContent = (
    <>
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
              marginBottom: index === menuItems.length - 1 ? 0 : undefined,
            }}
          >
            <Link
              href={item.href}
              style={{ width: "100%", textDecoration: "none" }}
            >
              <StyledListItemButton data-active={pathname === item.href}>
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
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            backgroundColor: "#1B2430",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return <SidebarContainer>{sidebarContent}</SidebarContainer>;
}
