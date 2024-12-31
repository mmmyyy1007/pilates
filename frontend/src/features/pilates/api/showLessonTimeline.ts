import { LessonTimelineApiRespose, LessonTimelineData } from "@/features/pilates/types/lessonTypes";
import { apiClient } from "@/lib/apiClient";

export const showLessonTimeline = async (): Promise<LessonTimelineData[]> => {
    const response = await apiClient.get<LessonTimelineApiRespose>("lesson/show/timeline");
    return response.data.timeline;
};
