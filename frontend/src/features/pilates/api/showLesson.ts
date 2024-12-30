import { LessonApiResponse, LessonData } from "@/features/pilates/types/lessonTypes";
import { apiClient } from "@/lib/apiClient";

export const showLesson = async (): Promise<LessonData[]> => {
    const response = await apiClient.get<LessonApiResponse>("lesson/show");
    return response.data.lesson;
};
