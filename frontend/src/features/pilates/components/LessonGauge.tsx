import { useLesson } from "@/features/pilates/hooks/useLesson";
import { LessonCountData } from "@/features/pilates/types/lessonTypes";
import { Box } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
import { useEffect, useState } from "react";

export const LessonGuage = () => {
    const [lessonCountData, setLessonCountData] = useState<LessonCountData>({ min: 0, max: 30, count: 0 });
    const { handleShowLessonGuage } = useLesson();

    useEffect(() => {
        /**
         * レッスン回数取得
         */
        const fetchLessonCountData = async () => {
            const response = await handleShowLessonGuage();

            setLessonCountData(response);
        };
        fetchLessonCountData();
    }, []);
    return (
        <Box>
            <Gauge
                width={100}
                height={100}
                value={lessonCountData.count}
                valueMin={lessonCountData.min}
                valueMax={lessonCountData.max}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
        </Box>
    );
};
