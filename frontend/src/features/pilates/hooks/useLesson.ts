import { deleteLesson } from "@/features/pilates/api/deleteLesson";
import { registerLesson } from "@/features/pilates/api/registerLesson";
import { showLesson } from "@/features/pilates/api/showLesson";
import { showLessonGuage } from "@/features/pilates/api/showLessonGuage";
import { showLessonTimeline } from "@/features/pilates/api/showLessonTimeline";
import { LessonDeleteData, LessonRegisterData } from "@/features/pilates/types/lessonTypes";
import { useCallback } from "react";

export const useLesson = () => {
    const handleShowLessonGuage = async () => {
        return await showLessonGuage();
    };
    const handleShowLessonTimeline = async () => {
        return await showLessonTimeline();
    };
    const handleShowLesson = useCallback(async () => {
        return await showLesson();
    }, []);
    const handleRegisterLesson = async (data: LessonRegisterData) => {
        await registerLesson(data);
    };
    const handleDeleteLesson = async (data: LessonDeleteData) => {
        await deleteLesson(data);
    };
    return {
        handleShowLessonGuage,
        handleShowLessonTimeline,
        handleShowLesson,
        handleRegisterLesson,
        handleDeleteLesson,
    };
};
