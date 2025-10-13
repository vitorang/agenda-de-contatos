import { BrowserRouter, Route, Routes } from "react-router";
import ContactListPage from "./pages/ContactListPage";
import LoginPage from "./pages/LoginPage";
import ContactEditPage from "./pages/ContactEditPage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContactListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<ContactEditPage />} />
          <Route path="/edit/:id" element={<ContactEditPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}