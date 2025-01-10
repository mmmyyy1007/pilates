import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { AccountFormData } from "@/features/pilates/types/accountTypes";

interface AccountUserModalProps {
    openUser: boolean;
    setOpenUser: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormName: AccountFormData;
    setupdateFormName: React.Dispatch<React.SetStateAction<AccountFormData>>;
    handleUpdate: (e: React.FormEvent) => Promise<void>;
}

export const AccountUserModal = ({
    openUser,
    setOpenUser,
    updateFormName,
    setupdateFormName,
    handleUpdate,
}: AccountUserModalProps) => {
    const { key, name, value } = updateFormName;
    return (
        <Modal open={openUser} onClose={() => setOpenUser(false)}>
            <Typography>変更</Typography>
            <TextField
                label={name}
                value={value}
                onChange={(e) =>
                    setupdateFormName({
                        key: key,
                        name: name,
                        value: e.target.value,
                    })
                }
            ></TextField>
            <Button variant="outlined" onClick={handleUpdate}>
                更新
            </Button>
        </Modal>
    );
};
