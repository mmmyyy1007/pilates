import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar as MUISnackbar } from "@mui/material";

/**
 * スナックバーの型
 */
interface SnackbarProps {
    message: string;
    severity: "error" | "info" | "success" | "warning";
    onClose: () => void;
}

export const Snackbar = ({ message, severity, onClose }: SnackbarProps) => {
    return (
        <MUISnackbar open={message !== null} onClose={onClose} autoHideDuration={5000}>
            <Alert
                severity={severity}
                variant="filled"
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </MUISnackbar>
    );
};
