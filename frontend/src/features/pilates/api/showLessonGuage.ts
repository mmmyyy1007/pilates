import { LessonCountApiResponse, LessonCountData } from "@/features/pilates/types/lessonTypes";
import { apiClient } from "@/lib/apiClient";

export const showLessonGuage = async (): Promise<LessonCountData> => {
    const response = await apiClient.get<LessonCountApiResponse>("lesson/show/guage");
    return response.data;
};
