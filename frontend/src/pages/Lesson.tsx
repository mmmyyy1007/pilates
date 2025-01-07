import { Typography } from "@/components/Typography";
import { LessonList } from "@/features/pilates/components/LessonList";

export const Lesson = () => {
    return (
        <>
            <Typography variant="h5">レッスン一覧</Typography>
            <LessonList />
        </>
    );
};
