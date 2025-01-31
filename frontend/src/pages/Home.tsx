import { GettingStartedStepper } from "@/features/pilates/components/GettingStartedStepper";
import { LessonGuage } from "@/features/pilates/components/LessonGauge";
import { LessonTimeline } from "@/features/pilates/components/LessonTimeline";
import { PilatesQuotes } from "@/features/pilates/components/PilatesQuotes";
import { Box } from "@mui/material";

/**
 * ホーム画面
 */
export const Home = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                px: 2,
                textAlign: "center",
            }}
        >
            <GettingStartedStepper />
            <LessonGuage />
            <LessonTimeline />
            <PilatesQuotes />
        </Box>
    );
};
