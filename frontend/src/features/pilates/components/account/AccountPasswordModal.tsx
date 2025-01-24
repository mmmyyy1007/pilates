import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Modal } from "@/components/Modal";
import { PasswordTextField } from "@/components/PasswordTextField";
import { Typography } from "@/components/Typography";
import { UpdatedPasswordData } from "@/features/pilates/types/accountTypes";
import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl, FormHelperText, IconButton, Stack } from "@mui/material";
import { ChangeEvent } from "react";

interface AccountPasswordModalProps {
    openPassword: boolean;
    setOpenPassword: (value: React.SetStateAction<boolean>) => void;
    openRegister: boolean;
    setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
    updatedPassword: UpdatedPasswordData;
    handleChangePasswordForm: (e: ChangeEvent<HTMLInputElement>) => void;
    handleUpdatePass: (e: React.FormEvent) => Promise<void>;
    errors: Record<string, string[]>;
}

export const AccountPasswordModal = ({
    openPassword,
    setOpenPassword,
    openRegister,
    setOpenRegister,
    updatedPassword,
    handleChangePasswordForm,
    handleUpdatePass,
    errors,
}: AccountPasswordModalProps) => {
    const { password, newPassword, ConfirmNewPassword } = updatedPassword;
    return (
        <>
            <Modal open={openPassword} onClose={() => setOpenPassword(false)}>
                <Stack spacing={2}>
                    <Typography>
                        現在のパスワードと新しいパスワードを入力してください。
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenPassword(false)}
                            style={{ position: "absolute", right: 4, top: 4 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Typography>
                    <FormControl fullWidth margin="normal" error={!!errors}>
                        <PasswordTextField
                            required
                            label="現在のパスワード"
                            value={password}
                            name="password"
                            onChange={handleChangePasswordForm}
                        />
                        <FormHelperText>{errors["password"]}</FormHelperText>
                        <PasswordTextField
                            sx={{ mt: 2 }}
                            required
                            label="新しいパスワード"
                            value={newPassword}
                            name="newPassword"
                            onChange={handleChangePasswordForm}
                        />
                        <FormHelperText>{errors["new_password"]}</FormHelperText>
                        <PasswordTextField
                            sx={{ mt: 2 }}
                            required
                            label="新しいパスワード(確認用)"
                            value={ConfirmNewPassword}
                            name="ConfirmNewPassword"
                            onChange={handleChangePasswordForm}
                        />
                        <FormHelperText>{errors["confirm_new_password"]}</FormHelperText>
                    </FormControl>
                    <Box>
                        <Button variant="outlined" onClick={() => setOpenRegister(true)}>
                            更新
                        </Button>
                    </Box>
                </Stack>
            </Modal>
            <Dialog
                open={openRegister}
                title=""
                content="更新してもよろしいでしょうか。"
                cancel="キャンセル"
                confirm="更新する"
                onClose={() => setOpenRegister(false)}
                onConfirm={handleUpdatePass}
            />
        </>
    );
};
