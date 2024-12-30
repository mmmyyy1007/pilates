export interface LessonData {
    title: "string";
    start: "string";
    end: string;
}

export interface LessonApiResponse {
    lesson: LessonData[];
}
