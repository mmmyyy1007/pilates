import { LessonData } from "@/features/pilates/types/lessonTypes";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

interface LessonCalendarProps {
    lessonData: LessonData[];
    handleDateClick: (arg: EventClickArg) => Promise<void>;
}
export const LessonCalendar = ({ lessonData, handleDateClick }: LessonCalendarProps) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            locale="ja"
            initialView="dayGridMonth"
            height="auto"
            events={lessonData}
            eventClick={handleDateClick}
        />
    );
};
