import { LessonPlaceApiResponse, LessonPlaceData } from "@/features/pilates/types/lessonTypes";
import { apiClient } from "@/lib/apiClient";

export const showLessonPlace = async (): Promise<LessonPlaceData[]> => {
    const response = await apiClient.get<LessonPlaceApiResponse>("lesson/show");
    return response.data.place;
};
