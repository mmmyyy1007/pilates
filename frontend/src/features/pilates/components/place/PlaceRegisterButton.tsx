import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

interface PlaceRegisterButtonProps {
    openRegister: boolean;
    setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
    handleRegister: (e: React.FormEvent) => Promise<void>;
}

export const PlaceRegisterButton = ({ openRegister, setOpenRegister, handleRegister }: PlaceRegisterButtonProps) => {
    return (
        <>
            <Button variant="outlined" onClick={() => setOpenRegister(true)}>
                登録
            </Button>
            <Dialog
                open={openRegister}
                title=""
                content="登録してもよろしいでしょうか。"
                cancel="キャンセル"
                confirm="登録する"
                onClose={() => setOpenRegister(false)}
                onConfirm={handleRegister}
            />
        </>
    );
};
