import { Loading } from "@/components/Loading";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useAuthStore } from "@/features/auth/stores/authStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { UserData } from "../types/accountTypes";

export const AccountList = () => {
    const { user } = useAuthStore();

    if (!user) {
        return <Loading />;
    }

    const userData: UserData = {
        username: "〇〇 〇〇",
        date: "2024-04-06",
        mail: "saso@test.jp",
        password: "sasosaso",
    };
    // const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5">アカウント管理</Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Box>
                            <AccountCircleIcon fontSize="large" />
                        </Box>
                    </Grid>
                    <Grid size={8}>
                        <Box>
                            {user.name}
                            <CreateIcon />
                        </Box>
                        <Box>start {userData.date} ～</Box>
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
            {/* <Modal open={open} onClose={() => setOpen(true)}>
                <Typography>変更</Typography>
                <TextField label="メールアドレス" defaultValue={userData.mail}></TextField>
                <Button variant="outlined">更新</Button>
            </Modal> */}
        </Box>
    );
};
