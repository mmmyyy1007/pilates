import { Alert, Snackbar as MUISnackbar } from "@mui/material";

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
            <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </MUISnackbar>
    );
};
