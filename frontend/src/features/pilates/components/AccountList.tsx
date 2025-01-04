import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useAccount } from "@/features/pilates/hooks/useAccount";
import { AccountData, AccountFormData, UpdatedAccountData } from "@/features/pilates/types/accountTypes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

export const AccountList = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [accountData, setAccountData] = useState<AccountData>({ name: "", date: "", email: "" });
    const [updatedFormName, setupdatedFormName] = useState<AccountFormData>({ key: "", name: "", value: "" });
    const { handleShowAccount, handleUpdateUser } = useAccount();
    const [changedData, setChangedData] = useState<UpdatedAccountData>({ key: "", data: "" });

    useEffect(() => {
        /**
         * アカウントデータ表示
         */
        const fetchAccountData = async () => {
            const response = await handleShowAccount();

            setAccountData(response);
        };
        fetchAccountData();
    }, []);

    /**
     * 更新用モーダル表示
     */
    const handleModalOpen = (formKey: string, formName: string, formValue: string) => {
        setupdatedFormName({ key: formKey, name: formName, value: formValue });
        setChangedData({ key: formKey, data: formValue });
        setOpen(true);
    };

    /**
     * ログインユーザー変更
     * @param e
     */
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setOpen(false);
        await handleUpdateUser(changedData);
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
                            <CreateIcon onClick={() => handleModalOpen("name", "名前", accountData.name)} />
                        </Box>
                        <Box>start ～ {accountData.date}</Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Typography>
                    {accountData.email}
                    <CreateIcon onClick={() => handleModalOpen("email", "メールアドレス", accountData.email)} />
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
                    label={updatedFormName.name}
                    value={changedData.data}
                    onChange={(e) => setChangedData({ key: updatedFormName.key, data: e.target.value })}
                ></TextField>
                <Button variant="outlined" onClick={handleRegister}>
                    更新
                </Button>
            </Modal>
        </Box>
    );
};
