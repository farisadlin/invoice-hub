"use client";

import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {
  ErrorCode,
  HomeButton,
  Title,
  Description,
  Container,
} from "./styles/NotFoundPage.styles";

export default function NotFoundPage() {
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
