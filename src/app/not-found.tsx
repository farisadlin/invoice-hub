"use client";

import { Box, Button, Typography, styled } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "24px",
  backgroundColor: "#F8FAFC",
  textAlign: "center",
});

const ErrorCode = styled(Typography)({
  fontSize: "120px",
  fontWeight: 700,
  color: "#1E293B",
  lineHeight: 1,
  marginBottom: "24px",
  fontFamily: "var(--font-inter), sans-serif",
});

const Title = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
  color: "#1E293B",
  marginBottom: "16px",
  fontFamily: "var(--font-inter), sans-serif",
});

const Description = styled(Typography)({
  fontSize: "16px",
  color: "#64748B",
  marginBottom: "32px",
  maxWidth: "460px",
});

const HomeButton = styled(Button)({
  padding: "12px 24px",
  borderRadius: "8px",
  backgroundColor: "#4F46E5",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#4338CA",
  },
});

export default function NotFound() {
  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Image
          src="/assets/404-illustration.svg"
          alt="404 Illustration"
          width={300}
          height={300}
          priority
        />
      </Box>
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Description>
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps
        you&apos;ve mistyped the URL? Be sure to check your spelling.
      </Description>
      <Link href="/invoices/add" style={{ textDecoration: "none" }}>
        <HomeButton variant="contained">Go to Home</HomeButton>
      </Link>
    </Container>
  );
}
