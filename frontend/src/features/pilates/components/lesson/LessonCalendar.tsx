import { LessonData } from "@/features/pilates/types/lessonTypes";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

interface LessonCalendarProps {
    lessonData: LessonData[];
    handleDateClick: (arg: DateClickArg) => Promise<void>;
    handleEventClick: (arg: EventClickArg) => Promise<void>;
}
export const LessonCalendar = ({ lessonData, handleDateClick, handleEventClick }: LessonCalendarProps) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            locale="ja"
            initialView="dayGridMonth"
            height="auto"
            events={lessonData}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventMouseEnter={(info) => {
                info.el.style.cursor = "pointer";
            }}
            eventMouseLeave={(info) => {
                info.el.style.cursor = "default";
            }}
            dayCellContent={(arg) => {
                // 日付をフォーマット
                const date = new Date(arg.date);
                const formattedDate = `${date.getMonth() + 1}月${date.getDate()}日`;

                return {
                    html: `<div style="cursor: pointer;" title="新規登録(${formattedDate})">${arg.date.getDate()}</div>`,
                };
            }}
        />
    );
};
