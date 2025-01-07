import { Button } from "@/components/Button";
import { PasswordTextField } from "@/components/PasswordTextField";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { RegisterData } from "@/features/auth/types/authTypes";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { Box } from "@mui/material";
import React, { useState } from "react";

/**
 * ユーザー登録フォーム
 */
export const RegisterForm = () => {
    const { handleRegister } = useRegister();
    const { errors, handleError, resetErrors } = useErrorHandler();

    const [formData, setFormData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    /**
     * 入力値の変更ハンドラー
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * ユーザー登録処理
     */
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();
        try {
            await handleRegister(formData);
            setFormData({ name: "", email: "", password: "", password_confirmation: "" });
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Box component={"form"} onSubmit={onSubmit} sx={{ maxWidth: 400, mx: "auto" }}>
            <Typography variant="h6" gutterBottom>
                新規登録
            </Typography>
            <TextField
                label="名前"
                fullWidth
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name ? errors.name[0] : ""}
                sx={{ mb: 2 }}
            />
            <TextField
                label="メールアドレス"
                fullWidth
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email ? errors.email[0] : ""}
                sx={{ mb: 2 }}
            />
            <PasswordTextField
                label="パスワード"
                fullWidth
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password ? errors.password[0] : ""}
                sx={{ mb: 2 }}
            />
            <PasswordTextField
                label="パスワード（確認用）"
                fullWidth
                required
                name="password_confirmation"
                value={formData.password_confirmation}
                error={!!errors.password_confirmation}
                helperText={errors.password_confirmation ? errors.password_confirmation[0] : ""}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                登録
            </Button>
        </Box>
    );
};
