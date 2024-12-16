import { Typography } from "@/components/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { formatDate, formatTime } from "../../../utils/dateUtils";
import { TimelineData } from "../types/timelineTypes";

export const LessonTimeline = () => {
    const timelineData: TimelineData[] = [
        {
            id: 1,
            date: "2024-12-06",
            start: "12:00:00",
            end: "12:50:00",
            place: "STUDIO IVY 奥沢店",
        },
        {
            id: 2,
            date: "2024-04-13",
            start: "12:00:00",
            end: "12:50:00",
            place: "STUDIO IVY 奥沢店",
        },
        {
            id: 3,
            date: "2024-05-06",
            start: "12:00:00",
            end: "12:50:00",
            place: "STUDIO IVY 奥沢店",
        },
    ];

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
