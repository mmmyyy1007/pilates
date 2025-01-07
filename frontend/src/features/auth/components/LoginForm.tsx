import { Button } from "@/components/Button";
import { PasswordTextField } from "@/components/PasswordTextField";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { Box } from "@mui/material";
import React, { useState } from "react";

/**
 * ログインフォーム
 */
export const LoginForm = () => {
    const { handleLogin } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { generalError, handleError, resetErrors } = useErrorHandler();

    /**
     * ログイン処理
     */
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();
        try {
            await handleLogin({ email, password });
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
            <TextField
                label="メールアドレス"
                fullWidth
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
            />
            <PasswordTextField
                label="パスワード"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                ログイン
            </Button>
        </Box>
    );
};
