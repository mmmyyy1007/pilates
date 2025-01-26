import { Dialog } from "@/components/Dialog";

interface AccountUserModalProps {
    openRegister: boolean;
    setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
    handleUpdate: (e: React.FormEvent) => Promise<void>;
}

export const AccountUserModal = ({ openRegister, setOpenRegister, handleUpdate }: AccountUserModalProps) => {
    return (
        <Dialog
            open={openRegister}
            title=""
            content="登録してもよろしいでしょうか。"
            cancel="キャンセル"
            confirm="登録する"
            onClose={() => setOpenRegister(false)}
            onConfirm={handleUpdate}
        />
    );
};
