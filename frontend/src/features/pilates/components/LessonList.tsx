import { Button } from "@/components/Button";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { MESSAGES } from "@/constants/message";
import { useLesson } from "@/features/pilates/hooks/useLesson";
import { usePlace } from "@/features/pilates/hooks/usePlace";
import { LessonData, LessonStartEndData } from "@/features/pilates/types/lessonTypes";
import { ActivePlaceData } from "@/features/pilates/types/placeTypes";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Alert, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const LessonList = () => {
    const [ActivePlaceData, setActivePlaceData] = useState<ActivePlaceData[]>([]);
    const [lessonData, setLessonData] = useState<LessonData[]>([]);
    const [SelectedPlaceData, setSelectedPlaceData] = useState<ActivePlaceData | null>(null);
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

    useEffect(() => {
        const fetchLessonData = async () => {
            /**
             * レッスン一覧取得(カレンダー内)
             * 店舗一覧取得
             */
            const [lessonResponse, placeResponse] = await Promise.all([handleShowLesson(), handleActiveShowPlace()]);

            setActivePlaceData(placeResponse);
            setLessonData(lessonResponse);
        };
        fetchLessonData();
    }, []);

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
        if (SelectedPlaceData && startEndData.start && startEndData.end) {
            const data = {
                place: SelectedPlaceData.name,
                placeId: SelectedPlaceData.id,
                startDatetime: startEndData.start.format("YYYY-MM-DD HH:mm:ss"),
                endDatetime: startEndData.end.format("YYYY-MM-DD HH:mm:ss"),
                id: selectedId,
            };

            try {
                await handleRegisterLesson(data);
                setAlertServerity("success");
                setAlertMessage(MESSAGES.registerSuccess);
            } catch (error) {
                setAlertServerity("error");
                setAlertMessage(MESSAGES.registerError);
                handleError(error);
            }
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5">レッスン一覧</Typography>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                locale="ja"
                initialView="dayGridMonth"
                height="auto"
                events={lessonData}
                eventClick={handleDateClick}
            />
            {alertMessage && (
                <Alert severity={alertSeverity} onClose={() => setAlertMessage(null)}>
                    {alertMessage}
                </Alert>
            )}
            <DateTimePicker
                label="開始日時"
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                value={startEndData.start}
                onChange={(newStartDate) =>
                    setStartEndData((prevState) => ({
                        ...prevState,
                        start: newStartDate,
                    }))
                }
            />
            <DateTimePicker
                label="終了日時"
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                value={startEndData.end}
                onChange={(newEndDate) =>
                    setStartEndData((prevState) => ({
                        ...prevState,
                        end: newEndDate,
                    }))
                }
            />
            <Autocomplete
                disablePortal
                noOptionsText=""
                value={SelectedPlaceData}
                options={ActivePlaceData}
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 300 }}
                onChange={(_, newValue) => setSelectedPlaceData(newValue)}
                renderInput={(params) => <TextField {...params} label="レッスン場所" />}
            />
            <Button variant="outlined" onClick={handleRegister}>
                登録
            </Button>
        </Box>
    );
};
