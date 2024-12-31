export interface LessonData {
    title: string;
    start: string;
    end: string;
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
