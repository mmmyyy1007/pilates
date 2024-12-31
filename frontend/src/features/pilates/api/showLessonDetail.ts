import { LessonDetailId } from "@/features/pilates/types/lessonTypes";
import { apiClient } from "@/lib/apiClient";

export const showLessonDetail = async (id: LessonDetailId): Promise<void> => {
    await apiClient.post<void>("lesson/show/detail", id);
};
