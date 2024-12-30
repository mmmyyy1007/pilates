import { Button } from "@/components/Button";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useLesson } from "@/features/pilates/hooks/useLesson";
import { usePlace } from "@/features/pilates/hooks/usePlace";
import { LessonData } from "@/features/pilates/types/lessonTypes";
import { ActivePlaceData } from "@/features/pilates/types/placeTypes";
// import allLocales from "@fullcalendar/core/locales-all";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

export const LessonList = () => {
    const [ActivePlaceData, setActivePlaceData] = useState<ActivePlaceData[]>([]);
    const [LessonData, setLessonData] = useState<LessonData[]>([]);
    const { handleActiveShowPlace } = usePlace();
    const { handleShowLesson } = useLesson();
    useEffect(() => {
        const fetchLessonData = async () => {
            const [lessonResponse, placeResponse] = await Promise.all([handleShowLesson(), handleActiveShowPlace()]);
            console.log(lessonResponse);
            setActivePlaceData(placeResponse);
            setLessonData(lessonResponse);
        };
        fetchLessonData();
    }, []);
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5">レッスン一覧</Typography>
            <FullCalendar
                plugins={[dayGridPlugin]} // pluginsにdayGridPluginを設定する
                // locales={allLocales}
                locale="ja"
                // headerToolbar={{
                //     right: "dayGridMonth,dayGridWeek",
                // }}
                initialView="dayGridMonth" // 初期表示のモードを設定する
                // events={[{ title: "event", start: "2024-12-30T12:00:00", end: "2024-12-30T12:50:00" }]}
                events={LessonData}
            />
            <DateTimePicker label="開始日時" slotProps={{ textField: { size: "small", fullWidth: true } }} />
            <DateTimePicker label="終了日時" slotProps={{ textField: { size: "small", fullWidth: true } }} />
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
