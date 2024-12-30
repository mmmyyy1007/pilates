export interface LessonPlaceData {
    id: string;
    name: string;
}

export interface LessonPlaceApiResponse {
    list: { place: LessonPlaceData[] };
}
