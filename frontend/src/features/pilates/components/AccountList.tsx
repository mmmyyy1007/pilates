import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useAccount } from "@/features/pilates/hooks/useAccount";
import { AccountData, AccountUserNameData } from "@/features/pilates/types/accountTypes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

export const AccountList = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [accountData, setAccountData] = useState<AccountData>({ name: "", date: "", email: "" });
    const { handleShowAccount, handleRegisterUserName } = useAccount();
    const [changedName, setChangedName] = useState<AccountUserNameData>({ name: "" });

    useEffect(() => {
        /**
         * アカウントデータ表示
         */
        const fetchAccountData = async () => {
            const response = await handleShowAccount();

            setAccountData(response);
            setChangedName({ name: response.name });
        };
        fetchAccountData();
    }, []);

    /**
     * 更新用モーダル表示
     */
    const handleModalOpen = () => {
        setOpen(true);
    };

    /**
     * ログインユーザー変更
     * @param e
     */
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setOpen(false);
        await handleRegisterUserName(changedName);
    };

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
                            {accountData.name}
                            <CreateIcon onClick={handleModalOpen} />
                        </Box>
                        <Box>start ～ {accountData.date}</Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Typography>
                    {accountData.email}
                    <CreateIcon />
                </Typography>
            </Box>
            <Box>
                <Typography>
                    *******
                    <CreateIcon />
                </Typography>
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Typography>変更</Typography>
                <TextField
                    label="名前"
                    value={changedName.name}
                    onChange={(e) => setChangedName({ name: e.target.value })}
                ></TextField>
                <Button variant="outlined" onClick={handleRegister}>
                    更新
                </Button>
            </Modal>
        </Box>
    );
};
