import { useLesson } from "@/features/pilates/hooks/useLesson";
import { LessonCountData } from "@/features/pilates/types/lessonTypes";
import { Box } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
import { useEffect, useState } from "react";

export const LessonGuage = () => {
    const valueLessonMin = 0;
    const valueLessonMax = 30;
    const [lessonCountData, setLessonCountData] = useState<LessonCountData>({ count: 0 });
    const { handleShowLessonGuage } = useLesson();
    useEffect(() => {
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
                valueMin={valueLessonMin}
                valueMax={valueLessonMax}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
        </Box>
    );
};
