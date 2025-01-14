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
        />
    );
};
