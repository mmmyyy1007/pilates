import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { theme } from "./configs/theme";
import { AppRouter } from "./routes/AppRouter";

dayjs.locale("ja");

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                <CssBaseline />
                <AppRouter />
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
