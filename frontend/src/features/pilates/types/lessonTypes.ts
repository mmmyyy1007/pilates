export interface LessonData {
    title: string;
    start: string;
    end: string;
    id: string;
}

export interface LessonApiResponse {
    lesson: LessonData[];
}

export interface LessonCountData {
    count: number;
}

export interface LessonCountApiResponse {
    count: LessonCountData;
}

export interface LessonTimelineData {
    id: string;
    date: string;
    start: string;
    end: string;
    place: string;
}

export interface LessonTimelineApiRespose {
    timeline: LessonTimelineData[];
}

export interface LessonDetailId {
    id: string;
}
