import { Button } from "@/components/Button";
import { TextField } from "@/components/TextFiled";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { ResetPasswordData } from "@/features/auth/types/authTypes";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

/**
 * パスワードリセットフォーム
 */
export const ResetPasswordForm = () => {
    const { token } = useParams<{ token: string }>();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [hasValidatedToken, setHasValidatedToken] = useState(false);

    const { handleResetPassword, handleCheckResetToken } = useResetPassword();
    const { errors, generalError, handleError, resetErrors } = useErrorHandler();

    /**
     * トークンの有効性を検証
     */
    const validateToken = useCallback(async () => {
        try {
            if (!token || !email) {
                throw new Error("このリセットURLは無効です。");
            }
            await handleCheckResetToken({ token, email });
        } catch (error) {
            handleError(error);
        } finally {
            setHasValidatedToken(true);
        }
    }, [token, email, handleCheckResetToken, handleError]);

    useEffect(() => {
        // トークンとメールが存在する場合のみ検証
        if (!hasValidatedToken) {
            validateToken();
        }
    }, [token, email, validateToken, hasValidatedToken]);

    /**
     * パスワードリセット処理
     */
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        const resetData: ResetPasswordData = {
            token: token!,
            email: email!,
            password,
            password_confirmation: passwordConfirmation,
        };

        try {
            await handleResetPassword(resetData);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 300, mx: "auto" }}>
            {generalError && Object.keys(errors).length === 0 && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {generalError}
                </Typography>
            )}
            <TextField
                type="password"
                label="新しいパスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                error={!!errors.password}
                helperText={errors.password ? errors.password[0] : ""}
                sx={{ mb: 2 }}
            />
            <TextField
                type="password"
                label="パスワード確認"
                value={passwordConfirmation}
                fullWidth
                required
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                error={!!errors.password_confirmation}
                helperText={errors.password_confirmation ? errors.password_confirmation[0] : ""}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                パスワードをリセット
            </Button>
        </Box>
    );
};
