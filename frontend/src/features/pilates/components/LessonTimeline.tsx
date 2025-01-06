import { Typography } from "@/components/Typography";
import { useLesson } from "@/features/pilates/hooks/useLesson";
import { LessonTimelineData } from "@/features/pilates/types/lessonTypes";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { useEffect, useState } from "react";

export const LessonTimeline = () => {
    const [lessonTimelineData, setLessonTimelineData] = useState<LessonTimelineData[]>([]);
    const { handleShowLessonTimeline } = useLesson();

    useEffect(() => {
        /**
         * レッスンタイムライン取得
         */
        const fetchLessonTimelineData = async () => {
            const response = await handleShowLessonTimeline();

            setLessonTimelineData(response);
        };
        fetchLessonTimelineData();
    }, []);

    return (
        <Timeline>
            {lessonTimelineData.map((item) => (
                <TimelineItem key={item.id}>
                    <TimelineOppositeContent>
                        <Typography variant="h6" component="span">
                            {item.date}
                        </Typography>
                        <br />
                        <Typography sx={{ fontSize: "14px" }}>
                            ({item.start}~{item.end})
                        </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot
                            sx={{
                                border: "none",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#3a90ff",
                                color: "#fff",
                                fontSize: "16px",
                            }}
                            variant="outlined"
                        >
                            {item.count}
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent color="text.secondary">{item.place}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};
