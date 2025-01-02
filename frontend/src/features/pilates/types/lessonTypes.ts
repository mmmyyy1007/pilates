export interface LessonData {
    title: string;
    start: string;
    end: string;
    id: string;
    place: string;
    placeId: string;
}

export interface LessonApiResponse {
    lesson: LessonData[];
}

export interface LessonCountData {
    count: number;
}

export type LessonCountApiResponse = LessonCountData;

export interface LessonTimelineData {
    id: string;
    date: string;
    start: string;
    end: string;
    place: string;
    count: number;
}

export interface LessonTimelineApiRespose {
    timeline: LessonTimelineData[];
}

export interface LessonDetailId {
    id: string;
}

export interface LessonRegisterData {
    startDatetime: string;
    endDatetime: string;
    id: string;
    place: string;
    placeId: string;
}
