"use client";

import { Box, styled } from "@mui/material";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

const LayoutContainer = styled(Box)({
  display: "flex",
  minHeight: "100vh",
});

const MainContent = styled(Box)({
  marginLeft: 280,
  width: "calc(100% - 280px)",
  height: "100vh",
  backgroundColor: "#F8FAFC",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const PageContent = styled(Box)({
  padding: "24px 32px",
  flexGrow: 1,
  overflowY: "auto",
});

export default function InvoicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Topbar />
        <PageContent>{children}</PageContent>
      </MainContent>
    </LayoutContainer>
  );
}
