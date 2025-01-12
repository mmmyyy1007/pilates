import { Button } from "@/components/Button";

interface LessonButtonProps {
    handleRegister: (e: React.FormEvent) => Promise<void>;
}
export const LessonButton = ({ handleRegister }: LessonButtonProps) => {
    return (
        <>
            <Button variant="outlined" onClick={handleRegister}>
                登録
            </Button>
        </>
    );
};
