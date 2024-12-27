import { Loading } from "@/components/Loading";
import { Typography } from "@/components/Typography";
// import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { LessonTimeline } from "@/features/pilates/components/LessonTimeline";
import { PilatesQuotes } from "@/features/pilates/components/PilatesQuotes";
import { Box } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";

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
            <Gauge
                width={100}
                height={100}
                value={10}
                valueMin={0}
                valueMax={30}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
            {/* <LogoutButton /> */}
            <LessonTimeline />
            {/* <SpeedDialMenu /> */}
            <PilatesQuotes />
        </Box>
    );
};
