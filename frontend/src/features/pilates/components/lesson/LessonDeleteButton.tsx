import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

interface LessonDeleteButtonProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: (e: React.FormEvent) => Promise<void>;
}

export const LessonDeleteButton = ({ open, setOpen, handleDelete }: LessonDeleteButtonProps) => {
    return (
        <>
            <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
                削除
            </Button>
            <Dialog
                open={open}
                title=""
                content="削除してもよろしいでしょうか。"
                cancel="削除しない"
                confirm="削除する"
                id=""
                onClose={() => setOpen(false)}
                onConfirm={handleDelete}
            />
        </>
    );
};
