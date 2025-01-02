import { registerLesson } from "@/features/pilates/api/registerLesson";
import { showLesson } from "@/features/pilates/api/showLesson";
import { showLessonGuage } from "@/features/pilates/api/showLessonGuage";
import { showLessonTimeline } from "@/features/pilates/api/showLessonTimeline";
import { LessonRegisterData } from "@/features/pilates/types/lessonTypes";

export const useLesson = () => {
    const handleShowLessonGuage = async () => {
        return await showLessonGuage();
    };
    const handleShowLessonTimeline = async () => {
        return await showLessonTimeline();
    };
    const handleShowLesson = async () => {
        return await showLesson();
    };
    // const handleShowLessonDetail = async (id: LessonDetailId) => {
    //     await showLessonDetail(id);
    // };
    const handleRegisterLesson = async (data: LessonRegisterData) => {
        await registerLesson(data);
    };
    return {
        handleShowLessonGuage,
        handleShowLessonTimeline,
        handleShowLesson,
        handleRegisterLesson,
    };
};
