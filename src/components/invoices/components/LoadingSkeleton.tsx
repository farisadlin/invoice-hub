"use client";

import { Box, Skeleton } from "@mui/material";
import {
  TableContainer,
  TableHeader,
  TableRow,
} from "../styles/InvoiceList.styles";

export function LoadingSkeleton() {
  return (
    <TableContainer>
      <TableHeader>
        <Box>Invoice</Box>
        <Box>Due Date</Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>Status</Box>
        <Box>Amount</Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>Actions</Box>
      </TableHeader>
      {[1, 2, 3].map((index) => (
        <TableRow key={index}>
          <Box>
            <Skeleton
              variant="text"
              width={150}
              height={24}
              sx={{ mb: "3px" }}
            />
            <Skeleton variant="text" width={100} height={21} />
          </Box>
          <Box>
            <Skeleton variant="text" width={120} height={24} />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Skeleton
              variant="rounded"
              width={80}
              height={22}
              sx={{ display: "inline-block" }}
            />
          </Box>
          <Box>
            <Skeleton variant="text" width={150} height={24} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
        </TableRow>
      ))}
    </TableContainer>
  );
}
