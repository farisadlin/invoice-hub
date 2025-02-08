import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LayoutContainer = styled(Box)({
  display: "flex",
  minHeight: "100vh",
});

export const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 280,
  width: "calc(100% - 280px)",
  height: "100vh",
  backgroundColor: "#F8FAFC",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    width: "100%",
  },
}));

export const PageContent = styled(Box)(({ theme }) => ({
  padding: "24px 32px",
  flexGrow: 1,
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));
