import { Typography } from "@/components/Typography";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { Box } from "@mui/material";

/**
 * パスワードリセット画面
 */
export const PasswordReset = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                px: 2,
                textAlign: "center",
            }}
        >
            <Typography variant="h4" gutterBottom>
                パスワードリセット
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                パスワードリセットのために必要な情報を入力してください。
            </Typography>
            <ResetPasswordForm />
        </Box>
    );
};
