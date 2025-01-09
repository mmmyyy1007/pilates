import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { PasswordTextField } from "@/components/PasswordTextField";
import { Typography } from "@/components/Typography";
import { UpdatedPasswordData } from "@/features/pilates/types/accountTypes";
import { Box } from "@mui/material";
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
    return (
        <>
            <Modal open={openPassword} onClose={() => setOpenPassword(false)}>
                <Typography>変更</Typography>
                <PasswordTextField
                    label="現在のパスワード"
                    value={updatedPassword.password}
                    name="password"
                    onChange={handleChangePasswordForm}
                />
                <PasswordTextField
                    label="新しいパスワード"
                    value={updatedPassword.newPassword}
                    name="newPassword"
                    onChange={handleChangePasswordForm}
                />
                <PasswordTextField
                    label="新しいパスワード(確認用)"
                    value={updatedPassword.ConfirmNewPassword}
                    name="ConfirmNewPassword"
                    onChange={handleChangePasswordForm}
                />
                <Box>
                    <Button variant="outlined" onClick={handleUpdatePass}>
                        更新
                    </Button>
                </Box>
            </Modal>
        </>
    );
};
