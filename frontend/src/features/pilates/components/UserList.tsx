import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { formatDate } from "../../../utils/dateUtils";
import { UserData } from "../types/userTypes";

export const UserList = () => {
    const userData: UserData = {
        username: "〇〇 〇〇",
        date: "2024-04-06",
        mail: "saso@test.jp",
        password: "sasosaso",
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
            <Box>
                <TextField label="メールアドレス" defaultValue={userData.mail} variant="standard"></TextField>
                <CreateIcon />
            </Box>
            <Box>
                <TextField label="パスワード" defaultValue={userData.password} variant="standard"></TextField>
                <CreateIcon />
            </Box>
        </Box>
    );
};
