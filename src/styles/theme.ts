import { createTheme, Components, Theme } from "@mui/material/styles";

// Color palette
const colors = {
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
    placeholder: "#B5B7C0",
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
};

// Typography configuration
const typography = {
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
};

// Component style overrides
const components: Components<Theme> = {
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
          backgroundColor: colors.background.paper,
          borderRadius: "10px",
          "& .MuiOutlinedInput-input": {
            paddingRight: "13px",
            lineHeight: "18px",
            fontWeight: 400,
          },
        },
        "& .MuiInputBase-input::placeholder": {
          color: colors.text.placeholder,
          opacity: 1,
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        backgroundColor: colors.background.paper,
        borderRadius: "10px",
        "& .MuiSelect-select": {
          padding: "13px 22px",
          lineHeight: "18px",
          fontWeight: 400,
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
          backgroundColor: colors.success.light,
          color: colors.success.main,
        },
      },
      {
        props: { color: "error" },
        style: {
          backgroundColor: colors.error.light,
          color: colors.error.main,
        },
      },
      {
        props: { color: "warning" },
        style: {
          backgroundColor: colors.warning.light,
          color: colors.warning.main,
        },
      },
    ],
  },
};

export const theme = createTheme({
  palette: colors,
  typography,
  components,
});
