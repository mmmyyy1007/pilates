import { registerLesson } from "@/features/pilates/api/registerLesson";
import { showLesson } from "@/features/pilates/api/showLesson";
import { showLessonGuage } from "@/features/pilates/api/showLessonGuage";
import { LessonData } from "@/features/pilates/types/lessonTypes";

export const useLesson = () => {
    const handleShowLessonGuage = async () => {
        return await showLessonGuage();
    };
    const handleShowLesson = async () => {
        return await showLesson();
    };
    const handleRegisterLesson = async (data: LessonData[]) => {
        await registerLesson(data);
    };
    return { handleShowLessonGuage, handleShowLesson, handleRegisterLesson };
};
