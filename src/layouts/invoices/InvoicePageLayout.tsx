"use client";

import { Container, Typography, Box } from "@mui/material";

interface InvoicePageLayoutProps {
  children: React.ReactNode;
  title: string;
  headerActions?: React.ReactNode;
}

export function InvoicePageLayout({
  children,
  title,
  headerActions,
}: InvoicePageLayoutProps) {
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1068px", py: 4 }}>
      <Box
        sx={{
          mb: "38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {headerActions}
      </Box>
      {children}
    </Container>
  );
}
