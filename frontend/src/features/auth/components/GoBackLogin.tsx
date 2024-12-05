import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { ROUTES } from "@/configs/routes";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * エラーページ型
 */
interface Message {
    message: string;
}

/**
 * エラーページ
 */
export const GoBackLogin = ({ message }: Message) => {
    const navigate = useNavigate();
    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="error">
                {message}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate(ROUTES.LOGIN)} sx={{ mt: 2 }}>
                ログイン画面に戻る
            </Button>
        </Box>
    );
};
