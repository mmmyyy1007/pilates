import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Box } from "@mui/material";
import { useState } from "react";

/**
 * ログイン画面
 */
export const Login = () => {
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const [isResetPasswordOpen, setResetPasswordOpen] = useState(false);

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
                ログイン
            </Typography>
            <LoginForm />
            <Box sx={{ mt: 2 }}>
                <Button variant="text" onClick={() => setRegisterOpen(true)}>
                    新規登録
                </Button>
                <Button variant="text" onClick={() => setResetPasswordOpen(true)}>
                    パスワードリセット
                </Button>
            </Box>

            <Modal open={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
                <RegisterForm />
            </Modal>

            <Modal open={isResetPasswordOpen} onClose={() => setResetPasswordOpen(false)}>
                <ForgotPasswordForm />
            </Modal>
        </Box>
    );
};
