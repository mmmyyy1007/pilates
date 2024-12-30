import { Button } from "@/components/Button";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useLesson } from "@/features/pilates/hooks/useLesson";
import { usePlace } from "@/features/pilates/hooks/usePlace";
import { LessonData } from "@/features/pilates/types/lessonTypes";
import { ActivePlaceData } from "@/features/pilates/types/placeTypes";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";

export const LessonList = () => {
    const [ActivePlaceData, setActivePlaceData] = useState<ActivePlaceData[]>([]);
    const [LessonData, setLessonData] = useState<LessonData[]>([]);
    const { handleActiveShowPlace } = usePlace();
    const { handleShowLesson } = useLesson();
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(Date.now()));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, "hour"));
    useEffect(() => {
        const fetchLessonData = async () => {
            const [lessonResponse, placeResponse] = await Promise.all([handleShowLesson(), handleActiveShowPlace()]);

            setActivePlaceData(placeResponse);
            setLessonData(lessonResponse);
        };
        fetchLessonData();
    }, []);
    const handleDateClick = useCallback((arg: DateClickArg) => {
        alert(arg.dateStr);
    }, []);
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5">レッスン一覧</Typography>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                // locales={allLocales}
                locale="ja"
                // headerToolbar={{
                //     right: "dayGridMonth,dayGridWeek",
                // }}
                initialView="dayGridMonth" // 初期表示のモードを設定する
                events={LessonData}
                dateClick={handleDateClick}
            />
            <DateTimePicker
                label="開始日時"
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                value={startDate}
                onChange={(newStartDate) => setStartDate(newStartDate)}
            />
            <DateTimePicker
                label="終了日時"
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                value={endDate}
                onChange={(newEndDate) => setEndDate(newEndDate)}
            />
            <Autocomplete
                disablePortal
                noOptionsText=""
                options={ActivePlaceData}
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="レッスン場所" />}
            />
            <Button variant="outlined">登録</Button>
        </Box>
    );
};
