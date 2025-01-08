import { Button } from "@/components/Button";

interface LessonButtonProps {
    handleRegister: (e: React.FormEvent) => Promise<void>;
    handleDelete: (e: React.FormEvent) => Promise<void>;
}
export const LessonButton = ({ handleRegister, handleDelete }: LessonButtonProps) => {
    return (
        <>
            <Button variant="outlined" onClick={handleRegister}>
                登録
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
                削除
            </Button>
        </>
    );
};
