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
    error: {
      main: "#EF4444",
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
            borderRadius: "8px",
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
  },
});
