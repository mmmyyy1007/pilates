import { Button } from "@/components/Button";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { Box } from "@mui/material";
import { useState } from "react";

/**
 * パスワードリセットリンク送信フォーム
 */
export const ForgotPasswordForm = () => {
    const { handleForgotPassword } = useForgotPassword();
    const [email, setEmail] = useState("");
    const { generalError, handleError, resetErrors } = useErrorHandler();

    /**
     * パスワードリセットリンク送信処理
     */
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();
        try {
            await handleForgotPassword({ email });
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 400, mx: "auto" }}>
            {generalError && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {generalError}
                </Typography>
            )}
            <Typography variant="h6" gutterBottom>
                パスワードリセット
            </Typography>
            <TextField
                label="メールアドレス"
                fullWidth
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                リセットリンクを送信
            </Button>
        </Box>
    );
};
