import { registerLesson } from "@/features/pilates/api/registerLesson";
import { showLesson } from "@/features/pilates/api/showLesson";
import { showLessonDetail } from "@/features/pilates/api/showLessonDetail";
import { showLessonGuage } from "@/features/pilates/api/showLessonGuage";
import { showLessonTimeline } from "@/features/pilates/api/showLessonTimeline";
import { LessonData, LessonDetailId } from "@/features/pilates/types/lessonTypes";

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
    const handleShowLessonDetail = async (id: LessonDetailId) => {
        await showLessonDetail(id);
    };
    const handleRegisterLesson = async (data: LessonData[]) => {
        await registerLesson(data);
    };
    return {
        handleShowLessonGuage,
        handleShowLessonTimeline,
        handleShowLesson,
        handleShowLessonDetail,
        handleRegisterLesson,
    };
};
