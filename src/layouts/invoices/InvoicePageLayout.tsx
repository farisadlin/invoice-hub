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
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { md: "space-between" },
          alignItems: { md: "center" },
          gap: { xs: 3, md: 0 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
        {headerActions}
      </Box>
      {children}
    </Container>
  );
}
