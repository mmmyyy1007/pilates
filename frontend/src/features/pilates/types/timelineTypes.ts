export type Time = {
    hour: number; // 時間 (0～23)
    minute: number; // 分 (0～59)
};

export interface TimelineData {
    id: number;
    date: Date;
    start: Time;
    end: Time;
    place: string;
}
