"use client";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { HeaderActionsProps } from "@/components/invoices/types";
import { theme } from "@/styles/theme";

export function HeaderActions({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: HeaderActionsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "25px",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          gap: "16px",
        },
      }}
    >
      <TextField
        placeholder="Search"
        value={search}
        onChange={onSearchChange}
        sx={{
          width: { xs: "100%", md: 216 },
          borderRadius: "10px",
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            height: "39.55px",
            borderRadius: "10px",
            fontSize: "12px",
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#94A3B8" }} />
            </InputAdornment>
          ),
        }}
      />
      <FormControl sx={{ width: { xs: "100%", md: 135 } }}>
        <Select
          value={status}
          onChange={onStatusChange}
          displayEmpty
          sx={{
            borderRadius: "10px",
            fontSize: "12px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="PAID">Paid</MenuItem>
          <MenuItem value="UNPAID">Unpaid</MenuItem>
          <MenuItem value="PENDING">Pending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
