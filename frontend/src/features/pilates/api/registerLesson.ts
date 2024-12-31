import { LessonData } from "@/features/pilates/types/lessonTypes";
import { apiClient } from "@/lib/apiClient";

export const registerLesson = async (data: LessonData[]): Promise<void> => {
    await apiClient.post<void>("lesson/register", data);
};
