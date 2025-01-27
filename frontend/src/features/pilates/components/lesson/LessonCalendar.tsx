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
                const cellElement = info.el.closest(".fc-daygrid-day") as HTMLElement; // HTMLElementとして扱う
                if (cellElement) {
                    cellElement.style.backgroundColor = ""; // セルの背景色をリセット
                }
            }}
            eventMouseLeave={(info) => {
                const cellElement = info.el.closest(".fc-daygrid-day") as HTMLElement; // HTMLElementとして扱う
                if (cellElement) {
                    cellElement.style.backgroundColor = ""; // セルの背景色をリセット
                }
            }}
            dayCellDidMount={(arg) => {
                // セル全体にスタイルを適用
                const cellElement = arg.el; // セル全体の要素
                cellElement.style.cursor = "pointer"; // ポインターを設定
                cellElement.style.transition = "background-color 0.3s"; // 背景色変更のアニメーション

                // ホバー時の背景色変更
                cellElement.addEventListener("mouseenter", () => {
                    cellElement.style.backgroundColor = "#e6f7ff"; // ホバー時の色
                });
                cellElement.addEventListener("mouseleave", () => {
                    cellElement.style.backgroundColor = ""; // デフォルトの背景色に戻す
                });
            }}
            headerToolbar={{
                start: "prev",
                center: "title",
                end: "next",
            }}
        />
    );
};
