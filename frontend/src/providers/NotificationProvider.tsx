import { useNotificationStore } from "@/stores/notificationStore";
import { Alert, Snackbar } from "@mui/material";

export const NotificationProvider = () => {
    const { message, type, show, clearNotification } = useNotificationStore();
    return (
        <Snackbar open={show} onClose={clearNotification} autoHideDuration={6000}>
            {message && type ? (
                <Alert onClose={clearNotification} severity={type} variant="filled" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            ) : undefined}
        </Snackbar>
    );
};
