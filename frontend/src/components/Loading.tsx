import { Box, CircularProgress } from "@mui/material";

/**
 * ローディングコンポーネント
 */
export const Loading = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <CircularProgress />
        </Box>
    );
};
