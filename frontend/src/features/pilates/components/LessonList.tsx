import { MESSAGES } from "@/constants/message";
import { LessonButton, LessonCalendar, LessonInputGroup } from "@/features/pilates/components/lesson";
import { useLesson } from "@/features/pilates/hooks/useLesson";
import { usePlace } from "@/features/pilates/hooks/usePlace";
import { LessonData, LessonStartEndData } from "@/features/pilates/types/lessonTypes";
import { ActivePlaceData } from "@/features/pilates/types/placeTypes";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { EventClickArg } from "@fullcalendar/core";
import { Alert, Box } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

export const LessonList = () => {
    const [activePlaceData, setActivePlaceData] = useState<ActivePlaceData[]>([]);
    const [lessonData, setLessonData] = useState<LessonData[]>([]);
    const [selectedPlaceData, setSelectedPlaceData] = useState<ActivePlaceData | null>(null);
    const [startEndData, setStartEndData] = useState<LessonStartEndData>({
        start: dayjs(Date.now()),
        end: dayjs().add(1, "hour"),
    });
    const [eventClickId, seteventClickId] = useState<string | null>(null);
    const [alertSeverity, setAlertServerity] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const { handleActiveShowPlace } = usePlace();
    const { handleShowLesson, handleRegisterLesson } = useLesson();
    const { handleError, resetErrors } = useErrorHandler();

    const fetchLessonData = useCallback(async () => {
        /**
         * レッスン一覧取得(カレンダー内)
         * 店舗一覧取得
         */
        const [lessonResponse, placeResponse] = await Promise.all([handleShowLesson(), handleActiveShowPlace()]);

        setActivePlaceData(placeResponse);
        setLessonData(lessonResponse);
    }, [handleShowLesson, handleActiveShowPlace]);

    useEffect(() => {
        fetchLessonData();
    }, [fetchLessonData]);

    /**
     * カレンダー内のイベントをクリック時
     * @param arg
     */
    const handleDateClick = async (arg: EventClickArg) => {
        const start = dayjs(arg.event.startStr);
        const end = dayjs(arg.event.endStr);
        const placeId = arg.event.extendedProps.placeId;
        const place = arg.event.extendedProps.place;
        setStartEndData({ start: start, end: end });
        setSelectedPlaceData({ id: placeId, name: place });
        seteventClickId(arg.event.id);
    };

    /**
     * レッスン情報登録
     * @param e
     */
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        const selectedId = lessonData.find((lesson) => lesson.id === eventClickId)?.id ?? Date.now().toString();
        if (selectedPlaceData && startEndData.start && startEndData.end) {
            const data = {
                place: selectedPlaceData.name,
                placeId: selectedPlaceData.id,
                startDatetime: startEndData.start.format("YYYY-MM-DD HH:mm:ss"),
                endDatetime: startEndData.end.format("YYYY-MM-DD HH:mm:ss"),
                id: selectedId,
            };

            try {
                await handleRegisterLesson(data);
                setAlertServerity("success");
                setAlertMessage(MESSAGES.registerSuccess);
                await fetchLessonData();
            } catch (error) {
                setAlertServerity("error");
                setAlertMessage(MESSAGES.registerError);
                handleError(error);
            }
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <LessonCalendar lessonData={lessonData} handleDateClick={handleDateClick} />
            {alertMessage && (
                <Alert severity={alertSeverity} onClose={() => setAlertMessage(null)}>
                    {alertMessage}
                </Alert>
            )}
            <LessonInputGroup
                startEndData={startEndData}
                setStartEndData={setStartEndData}
                selectedPlaceData={selectedPlaceData}
                activePlaceData={activePlaceData}
                setSelectedPlaceData={setSelectedPlaceData}
            />
            <LessonButton handleRegister={handleRegister} />
        </Box>
    );
};
