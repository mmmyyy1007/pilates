import { LessonDeleteData } from "@/features/pilates/types/lessonTypes";
import { apiClient } from "@/lib/apiClient";

export const deleteLesson = async (data: LessonDeleteData): Promise<void> => {
    await apiClient.delete<void>("lesson/delete", { data });
};
