import { Modal } from "@/components/Modal";
import { Snackbar } from "@/components/Snackbar";
import { Typography } from "@/components/Typography";
import { MESSAGES } from "@/constants/message";
import {
    LessonCalendar,
    LessonDeleteButton,
    LessonInputGroup,
    LessonRegisterButton,
} from "@/features/pilates/components/lesson";
import { useLesson } from "@/features/pilates/hooks/useLesson";
import { usePlace } from "@/features/pilates/hooks/usePlace";
import { LessonData, LessonRegisterData, LessonStartEndData } from "@/features/pilates/types/lessonTypes";
import { ActivePlaceData } from "@/features/pilates/types/placeTypes";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { EventClickArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

export const LessonList = () => {
    const now = Math.round(Date.now() / (5 * 60 * 1000)) * (5 * 60 * 1000);
    const [activePlaceData, setActivePlaceData] = useState<ActivePlaceData[]>([]);
    const [lessonData, setLessonData] = useState<LessonData[]>([]);
    const [selectedPlaceData, setSelectedPlaceData] = useState<ActivePlaceData | null>(null);
    const [startEndData, setStartEndData] = useState<LessonStartEndData>({
        id: Date.now().toString(),
        start: dayjs(now),
        end: dayjs(now).add(1, "hour"),
    });
    const [open, setOpen] = useState<boolean>(false);
    const [openRegister, setOpenRegister] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [isVisibleDelete, setIsVisibleDelete] = useState(false);
    const [alertSeverity, setAlertServerity] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const { handleActiveShowPlace } = usePlace();
    const { handleShowLesson, handleRegisterLesson, handleDeleteLesson } = useLesson();
    const { errors, handleError, resetErrors } = useErrorHandler();

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
     * カレンダー内のイベントをクリック時(更新)
     * @param arg
     */
    const handleEventClick = async (arg: EventClickArg) => {
        const start = dayjs(arg.event.startStr);
        const end = dayjs(arg.event.endStr);
        const placeId = arg.event.extendedProps.placeId;
        const place = arg.event.extendedProps.place;
        const id = arg.event.id;
        setStartEndData({ id: id, start: start, end: end });
        setSelectedPlaceData({ id: placeId, name: place });
        setOpen(true);
        setIsVisibleDelete(true);
    };

    /**
     * カレンダーの日付クリック時(新規)
     * @param arg
     */
    const handleDateClick = async (arg: DateClickArg) => {
        const start = dayjs(`${arg.dateStr}T${dayjs(now).format("HH:mm:ss")}`);
        const end = dayjs(`${arg.dateStr}T${dayjs(now).add(1, "hour").format("HH:mm:ss")}`);
        setStartEndData({ id: Date.now().toString(), start: start, end: end });
        setSelectedPlaceData({ id: "", name: "" });
        setOpen(true);
    };

    /**
     * レッスンモーダル閉じた時
     */
    const handleModalClose = () => {
        setOpen(false);
        setIsVisibleDelete(false);
    };

    /**
     * レッスン情報登録
     * @param e
     */
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        const selectedId = lessonData.find((lesson) => lesson.id === startEndData.id)?.id ?? Date.now().toString();
        if (selectedPlaceData && startEndData.start && startEndData.end) {
            const data: LessonRegisterData = {
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
                setOpen(false);
                await fetchLessonData();
            } catch (error) {
                setAlertServerity("error");
                setAlertMessage(MESSAGES.registerError);
                handleError(error);
            } finally {
                setOpenRegister(false);
            }
        }
    };

    /**
     * レッスン削除
     */
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        const selectedId = lessonData.find((lesson) => lesson.id === startEndData.id)?.id ?? "";
        const data = { id: selectedId };
        try {
            await handleDeleteLesson(data);
            setOpen(false);
            await fetchLessonData();
        } catch (error) {
            handleError(error);
        } finally {
            setOpenDelete(false);
        }
    };

    /**
     * スナックバー非表示
     */
    const handleClose = () => {
        setAlertMessage(null);
    };

    return (
        <Box sx={{ mt: 3 }}>
            {alertMessage && <Snackbar message={alertMessage} severity={alertSeverity} onClose={handleClose} />}
            <LessonCalendar
                lessonData={lessonData}
                handleDateClick={handleDateClick}
                handleEventClick={handleEventClick}
            />
            <Modal open={open} onClose={handleModalClose}>
                {errors && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {/* {errors} */}
                    </Typography>
                )}
                <LessonInputGroup
                    startEndData={startEndData}
                    setStartEndData={setStartEndData}
                    selectedPlaceData={selectedPlaceData}
                    activePlaceData={activePlaceData}
                    setSelectedPlaceData={setSelectedPlaceData}
                    handleModalClose={handleModalClose}
                />
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <LessonRegisterButton
                        open={openRegister}
                        setOpen={setOpenRegister}
                        handleRegister={handleRegister}
                    />
                    {isVisibleDelete && (
                        <LessonDeleteButton open={openDelete} setOpen={setOpenDelete} handleDelete={handleDelete} />
                    )}
                </Box>
            </Modal>
        </Box>
    );
};
