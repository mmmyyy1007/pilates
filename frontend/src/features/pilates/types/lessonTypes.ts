import { Dayjs } from "dayjs";

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
    min: number;
    max: number;
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

export interface LessonStartEndData {
    id: string;
    start: Dayjs | null;
    end: Dayjs | null;
}

export interface LessonRegisterData {
    startDatetime: string;
    endDatetime: string;
    id: string;
    place: string;
    placeId: string;
}

export interface LessonDeleteData {
    id: string;
}
