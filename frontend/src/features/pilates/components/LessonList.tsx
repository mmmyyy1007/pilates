import { Button } from "@/components/Button";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useLessonPlace } from "@/features/pilates/hooks/useLesson";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { LessonPlaceData } from "../types/lessonTypes";

export const LessonList = () => {
    const [LessonPlaceData, setLessonPlaceData] = useState<LessonPlaceData[]>([]);
    const { handleShowLessonPlace } = useLessonPlace();
    useEffect(() => {
        const fetchLessonPlaceData = async () => {
            const response = await handleShowLessonPlace();
            if (response.length === 0) {
                setLessonPlaceData([{ id: "", name: "" }]);
            } else {
                setLessonPlaceData(response);
            }
        };
        fetchLessonPlaceData();
    }, []);
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5">レッスン一覧</Typography>
            <FullCalendar
                plugins={[dayGridPlugin]} // pluginsにdayGridPluginを設定する
                // headerToolbar={{
                //     right: "dayGridMonth,dayGridWeek",
                // }}
                initialView="dayGridMonth" // 初期表示のモードを設定する
                events={"https://fullcalendar.io/api/demo-feeds/events.json"}
            />
            <DateTimePicker label="開始日時" slotProps={{ textField: { size: "small", fullWidth: true } }} />
            <DateTimePicker label="終了日時" slotProps={{ textField: { size: "small", fullWidth: true } }} />
            <Autocomplete
                disablePortal
                options={LessonPlaceData}
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="レッスン場所" />}
            />
            <Button variant="outlined">登録</Button>
        </Box>
    );
};
