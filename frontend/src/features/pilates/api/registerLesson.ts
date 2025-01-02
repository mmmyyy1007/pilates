import { LessonRegisterData } from "@/features/pilates/types/lessonTypes";
import { apiClient } from "@/lib/apiClient";

export const registerLesson = async (data: LessonRegisterData): Promise<void> => {
    await apiClient.post<void>("lesson/register", data);
};
