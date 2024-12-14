import { Typography } from "@/components/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { TimelineData } from "../types/timelineTypes";

export const LessonTimeline = () => {
    const timelineData: TimelineData[] = [
        {
            id: 1,
            date: new Date(2024, 4, 6),
            start: { hour: 12, minute: 0 },
            end: { hour: 12, minute: 50 },
            place: "STUDIO IVY 奥沢店",
        },
        {
            id: 2,
            date: new Date(2024, 4, 13),
            start: { hour: 12, minute: 0 },
            end: { hour: 12, minute: 50 },
            place: "STUDIO IVY 奥沢店",
        },
        {
            id: 3,
            date: new Date(2024, 5, 6),
            start: { hour: 12, minute: 0 },
            end: { hour: 12, minute: 50 },
            place: "STUDIO IVY 奥沢店",
        },
    ];
    /**
     * 日付をフォーマットする関数
     *
     * @param date
     * @returns
     */
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = date.getMonth().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}.${month}.${day}`;
    };
    /**
     * 時間をフォーマットする関数
     *
     * @param time
     * @returns
     */
    const formatTime = (time: { hour: number; minute: number }): string => {
        return `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
    };

    return (
        <Timeline>
            {timelineData.map((item) => (
                <TimelineItem key={item.id}>
                    <TimelineOppositeContent>
                        <Typography variant="h6" component="span">
                            {formatDate(item.date)}
                        </Typography>
                        <br />
                        <Typography sx={{ fontSize: "14px" }}>
                            ({formatTime(item.start)}~{formatTime(item.end)})
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
                            {item.id}
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent color="text.secondary">{item.place}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};
