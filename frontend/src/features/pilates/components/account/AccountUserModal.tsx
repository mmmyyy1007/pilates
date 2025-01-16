import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Modal } from "@/components/Modal";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { AccountFormData } from "@/features/pilates/types/accountTypes";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";

interface AccountUserModalProps {
    openUser: boolean;
    setOpenUser: React.Dispatch<React.SetStateAction<boolean>>;
    openRegister: boolean;
    setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormName: AccountFormData;
    setupdateFormName: React.Dispatch<React.SetStateAction<AccountFormData>>;
    handleUpdate: (e: React.FormEvent) => Promise<void>;
}

export const AccountUserModal = ({
    openUser,
    setOpenUser,
    openRegister,
    setOpenRegister,
    updateFormName,
    setupdateFormName,
    handleUpdate,
}: AccountUserModalProps) => {
    const { key, name, value } = updateFormName;
    return (
        <Modal open={openUser} onClose={() => setOpenUser(false)}>
            <Typography>
                {name}を入力してください。
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenUser(false)}
                    style={{ position: "absolute", right: 4, top: 4 }}
                >
                    <CloseIcon />
                </IconButton>
            </Typography>
            <Box sx={{ mt: 3 }}>
                <TextField
                    type="text"
                    label={name}
                    value={value}
                    required
                    onChange={(e) =>
                        setupdateFormName({
                            key: key,
                            name: name,
                            value: e.target.value,
                        })
                    }
                ></TextField>
                <Button variant="outlined" onClick={() => setOpenRegister(true)}>
                    更新
                </Button>
                <Dialog
                    open={openRegister}
                    title=""
                    content="登録してもよろしいでしょうか。"
                    cancel="キャンセル"
                    confirm="登録する"
                    onClose={() => setOpenRegister(false)}
                    onConfirm={handleUpdate}
                />
            </Box>
        </Modal>
    );
};
