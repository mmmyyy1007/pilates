import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./configs/theme";
import { AppRouter } from "./routes/AppRouter";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
        </ThemeProvider>
    );
}

export default App;
