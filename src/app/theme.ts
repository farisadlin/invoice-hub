import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5",
      dark: "#4338CA",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    grey: {
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
      disabled: "#94A3B8",
    },
    success: {
      main: "#219653",
      light: "rgba(33, 150, 83, 0.08)",
    },
    warning: {
      main: "#FFA70B",
      light: "rgba(255, 167, 11, 0.08)",
    },
    error: {
      main: "#D34053",
      light: "rgba(211, 64, 83, 0.08)",
    },
  },
  typography: {
    fontFamily: "var(--font-open-sans), sans-serif",
    h1: {
      fontFamily: "var(--font-inter), sans-serif",
    },
    h2: {
      fontFamily: "var(--font-inter), sans-serif",
    },
    h3: {
      fontFamily: "var(--font-inter), sans-serif",
    },
    h4: {
      fontFamily: "var(--font-inter), sans-serif",
    },
    h5: {
      fontFamily: "var(--font-inter), sans-serif",
    },
    h6: {
      fontFamily: "var(--font-inter), sans-serif",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
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
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
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
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow:
            "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { color: "success" },
          style: {
            backgroundColor: "rgba(33, 150, 83, 0.08)",
            color: "#219653",
          },
        },
        {
          props: { color: "error" },
          style: {
            backgroundColor: "rgba(211, 64, 83, 0.08)",
            color: "#D34053",
          },
        },
        {
          props: { color: "warning" },
          style: {
            backgroundColor: "rgba(255, 167, 11, 0.08)",
            color: "#FFA70B",
          },
        },
      ],
    },
  },
});
