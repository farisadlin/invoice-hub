import { Button, Card, Typography, TextField, Select } from "@mui/material";
import styled from "@emotion/styled";
import { styled as muiStyled } from "@mui/material/styles";

export const StyledCard = styled(Card)({
  border: "1px solid #E2E8F0",
  borderRadius: "4px",
  maxWidth: "1109px",
  margin: "0 auto",
});

export const FormTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
  color: "#1E293B",
  marginBottom: "32px",
  paddingBottom: "15px",
  borderBottom: "1px solid #E2E8F0",
  margin: "0 -26px 32px -26px",
  padding: "0 26px 15px 26px",
  fontFamily: "var(--font-inter), sans-serif",
});

export const RequiredLabel = styled("span")({
  color: "#EF4444",
  marginLeft: "4px",
});

export const FieldLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#1E293B",
  marginBottom: "8px",
});

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderRadius: "4px",
    "& fieldset": {
      borderColor: "#E2E8F0",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#CBD5E1",
      borderWidth: "1.5px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4F46E5",
      borderWidth: "1.5px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "13px 22px",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#94A3B8",
    opacity: 1,
  },
});

export const StyledSelect = styled(Select)({
  backgroundColor: "white",
  borderRadius: "4px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E2E8F0",
    borderWidth: "1.5px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#CBD5E1",
    borderWidth: "1.5px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4F46E5",
    borderWidth: "1.5px",
  },
  "& .MuiSelect-select": {
    padding: "13px 22px",
  },
  "& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
    {
      color: "#1E293B",
      "&[value='']": {
        color: "#94A3B8",
      },
    },
});

export const SubmitButton = muiStyled(Button)(({ theme }) => ({
  padding: "12px 24px",
  width: "30%",
  borderRadius: "8px",
  backgroundColor: "#4F46E5",
  fontSize: "16px",
  fontWeight: 500,
  marginTop: "32px",
  "&:hover": {
    backgroundColor: "#4338CA",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
