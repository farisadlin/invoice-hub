"use client";

import { Box, styled } from "@mui/material";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { useState } from "react";

const LayoutContainer = styled(Box)({
  display: "flex",
  minHeight: "100vh",
});

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 280,
  width: "calc(100% - 280px)",
  height: "100vh",
  backgroundColor: "#F8FAFC",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    width: "100%",
  },
}));

const PageContent = styled(Box)(({ theme }) => ({
  padding: "24px 32px",
  flexGrow: 1,
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));

export default function InvoicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isMobileOpen={isMobileOpen} onClose={handleDrawerToggle} />
      <MainContent>
        <Topbar onMenuClick={handleDrawerToggle} />
        <PageContent>{children}</PageContent>
      </MainContent>
    </LayoutContainer>
  );
}
