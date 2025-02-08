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
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AddCircleOutline, FormatListBulleted } from "@mui/icons-material";
import { theme } from "@/app/theme";

const DRAWER_WIDTH = 280;

const SidebarContainer = styled(Box)(({ theme }) => ({
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

const Logo = styled(Box)({
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

const StyledListItemButton = styled(ListItemButton)<{
  "data-active"?: boolean;
}>(({ theme, "data-active": active }) => ({
  borderRadius: theme.spacing(1),
  marginLeft: "25px",
  color: active ? "white" : "#94A3B8",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
}));

const MenuLabel = styled(Typography)({
  color: "#64748B",
  fontSize: "14px",
  fontWeight: 500,
  marginTop: "49.52px",
  marginBottom: "16px",
  paddingLeft: "40px",
});

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

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
