"use client";

import { Box, styled } from "@mui/material";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

const LayoutContainer = styled(Box)({
  display: "flex",
});

const MainContent = styled(Box)({
  marginLeft: 280,
  width: "calc(100% - 280px)",
  minHeight: "100vh",
  backgroundColor: "#F8FAFC",
});

const PageContent = styled(Box)({
  padding: "24px 32px",
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
