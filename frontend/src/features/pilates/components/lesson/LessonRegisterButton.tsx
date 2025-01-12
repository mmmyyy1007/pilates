import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

interface LessonRegisterButtonProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleRegister: (e: React.FormEvent) => Promise<void>;
}
export const LessonRegisterButton = ({ open, setOpen, handleRegister }: LessonRegisterButtonProps) => {
    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                登録
            </Button>
            <Dialog
                open={open}
                title=""
                content="登録してもよろしいでしょうか。"
                cancel="キャンセル"
                confirm="登録する"
                id=""
                onClose={() => setOpen(false)}
                onConfirm={handleRegister}
            />
        </>
    );
};
