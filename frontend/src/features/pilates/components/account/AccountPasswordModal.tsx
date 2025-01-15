import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { PasswordTextField } from "@/components/PasswordTextField";
import { Typography } from "@/components/Typography";
import { UpdatedPasswordData } from "@/features/pilates/types/accountTypes";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack } from "@mui/material";
import { ChangeEvent } from "react";

interface AccountPasswordModalProps {
    openPassword: boolean;
    setOpenPassword: (value: React.SetStateAction<boolean>) => void;
    updatedPassword: UpdatedPasswordData;
    handleChangePasswordForm: (e: ChangeEvent<HTMLInputElement>) => void;
    handleUpdatePass: (e: React.FormEvent) => Promise<void>;
}

export const AccountPasswordModal = ({
    openPassword,
    setOpenPassword,
    updatedPassword,
    handleChangePasswordForm,
    handleUpdatePass,
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
                    <PasswordTextField
                        required
                        label="現在のパスワード"
                        value={password}
                        name="password"
                        onChange={handleChangePasswordForm}
                    />
                    <PasswordTextField
                        required
                        label="新しいパスワード"
                        value={newPassword}
                        name="newPassword"
                        onChange={handleChangePasswordForm}
                    />
                    <PasswordTextField
                        required
                        label="新しいパスワード(確認用)"
                        value={ConfirmNewPassword}
                        name="ConfirmNewPassword"
                        onChange={handleChangePasswordForm}
                    />
                    <Box>
                        <Button variant="outlined" onClick={handleUpdatePass}>
                            更新
                        </Button>
                    </Box>
                </Stack>
            </Modal>
        </>
    );
};
