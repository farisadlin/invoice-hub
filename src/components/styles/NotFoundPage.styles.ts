import { Box, Button, Typography, styled } from "@mui/material";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "24px",
  backgroundColor: "#F8FAFC",
  textAlign: "center",
});

export const ErrorCode = styled(Typography)({
  fontSize: "120px",
  fontWeight: 700,
  color: "#1E293B",
  lineHeight: 1,
  marginBottom: "24px",
  fontFamily: "var(--font-inter), sans-serif",
});

export const Title = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
  color: "#1E293B",
  marginBottom: "16px",
  fontFamily: "var(--font-inter), sans-serif",
});

export const Description = styled(Typography)({
  fontSize: "16px",
  color: "#64748B",
  marginBottom: "32px",
  maxWidth: "460px",
});

export const HomeButton = styled(Button)({
  padding: "12px 24px",
  borderRadius: "8px",
  backgroundColor: "#4F46E5",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#4338CA",
  },
});
