import { Dialog } from "@/components/Dialog";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton, TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface AccountUserFormProps {
    value: string;
    label: string;
    id: string;
    openRegister: boolean;
    setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
    handleUpdate: (e: React.FormEvent) => Promise<void>;
    handleChangeUserForm: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AccountUserForm = ({
    value,
    label,
    id,
    openRegister,
    setOpenRegister,
    handleUpdate,
    handleChangeUserForm,
}: AccountUserFormProps) => {
    return (
        <>
            <TextField value={value} label={label} id={id} onChange={handleChangeUserForm}></TextField>
            <IconButton color="default" type="button" onClick={() => setOpenRegister(true)}>
                <CreateIcon />
            </IconButton>
            <Dialog
                open={openRegister}
                title=""
                content="更新してもよろしいでしょうか。"
                cancel="キャンセル"
                confirm="更新する"
                onClose={() => setOpenRegister(false)}
                onConfirm={handleUpdate}
            />
        </>
    );
};
