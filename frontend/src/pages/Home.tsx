import { Loading } from "@/components/Loading";
import { Typography } from "@/components/Typography";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { LessonGuage } from "@/features/pilates/components/LessonGauge";
import { LessonTimeline } from "@/features/pilates/components/LessonTimeline";
import { PilatesQuotes } from "@/features/pilates/components/PilatesQuotes";
import { Box } from "@mui/material";

/**
 * ホーム画面
 */
export const Home = () => {
    const { user } = useAuthStore();

    if (!user) {
        return <Loading />;
    }

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
            <Typography variant="h3" gutterBottom>
                ようこそ、{user.name}さん
            </Typography>
            <Typography variant="body1" gutterBottom>
                ここはホーム画面です。
            </Typography>
            <LessonGuage />
            <LessonTimeline />
            <PilatesQuotes />
        </Box>
    );
};
