"use client";

import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { useState } from "react";

import {
  LayoutContainer,
  PageContent,
  MainContent,
} from "@/layout/styles/MainLayout.styles";
export default function MainLayout({
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
