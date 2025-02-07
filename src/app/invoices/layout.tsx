"use client";

import { Box, styled } from "@mui/material";
import { Sidebar } from "@/components/Sidebar";

const MainContent = styled(Box)({
  marginLeft: 280,
  minHeight: "100vh",
  backgroundColor: "#F8FAFC",
});

export default function InvoicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </>
  );
}
