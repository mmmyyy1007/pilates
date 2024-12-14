import { Typography } from "@/components/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { UserData } from "../types/userTypes";

export const UserList = () => {
    const userData: UserData = {
        username: "〇〇 〇〇",
        date: new Date(2024, 4, 6),
    };
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
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5">アカウント設定</Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Box>
                            <AccountCircleIcon fontSize="large" />
                        </Box>
                    </Grid>
                    <Grid size={8}>
                        <Box>
                            {userData.username}
                            <CreateIcon />
                        </Box>
                        <Box>start {formatDate(userData.date)} ～</Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
