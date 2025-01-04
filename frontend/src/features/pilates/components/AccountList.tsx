import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { useAccount } from "@/features/pilates/hooks/useAccount";
import {
    AccountData,
    AccountFormData,
    UpdatedAccountData,
    UpdatedPasswordData,
} from "@/features/pilates/types/accountTypes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";

export const AccountList = () => {
    const [openUser, setOpenUser] = useState<boolean>(false);
    const [openPassword, setOpenPassword] = useState<boolean>(false);
    const [accountData, setAccountData] = useState<AccountData>({ name: "", date: "", email: "" });
    const [updatedFormName, setupdatedFormName] = useState<AccountFormData>({ key: "", name: "", value: "" });
    const { handleShowAccount, handleUpdateUser, handleUpdatePassword } = useAccount();
    const [changedData, setChangedData] = useState<UpdatedAccountData>({ key: "", data: "" });
    const [updatedPassword, setUpdatedPassword] = useState<UpdatedPasswordData>({
        password: "",
        newPassword: "",
        ConfirmNewPassword: "",
    });

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
     * 更新用モーダル表示(ユーザー名・メールアドレス)
     */
    const handleModalOpenUser = (formKey: string, formName: string, formValue: string) => {
        setupdatedFormName({ key: formKey, name: formName, value: formValue });
        setChangedData({ key: formKey, data: formValue });
        setOpenUser(true);
    };

    /**
     * 更新用モーダル表示(パスワード)
     */
    const handleModalOpenPassword = () => {
        setOpenPassword(true);
    };

    /**
     * ログインユーザー変更
     * @param e
     */
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setOpenUser(false);
        await handleUpdateUser(changedData);
    };

    /**
     * パスワード変更
     * @param e
     */
    const handleUpdatePass = async (e: React.FormEvent) => {
        e.preventDefault();
        setOpenPassword(false);
        await handleUpdatePassword(updatedPassword);
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
                            <CreateIcon onClick={() => handleModalOpenUser("name", "名前", accountData.name)} />
                        </Box>
                        <Box>start ～ {accountData.date}</Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Typography>
                    {accountData.email}
                    <CreateIcon onClick={() => handleModalOpenUser("email", "メールアドレス", accountData.email)} />
                </Typography>
            </Box>
            <Box>
                <Typography>
                    *******
                    <CreateIcon onClick={() => handleModalOpenPassword()} />
                </Typography>
            </Box>
            <Modal open={openUser} onClose={() => setOpenUser(false)}>
                <Typography>変更</Typography>
                <TextField
                    label={updatedFormName.name}
                    value={changedData.data}
                    onChange={(e) => setChangedData({ key: updatedFormName.key, data: e.target.value })}
                ></TextField>
                <Button variant="outlined" onClick={handleUpdate}>
                    更新
                </Button>
            </Modal>
            <Modal open={openPassword} onClose={() => setOpenPassword(false)}>
                <Typography>変更</Typography>
                <TextField
                    label="現在のパスワード"
                    value={updatedPassword.password}
                    onChange={(e) =>
                        setUpdatedPassword((prevState) => ({
                            ...prevState,
                            password: e.target.value,
                        }))
                    }
                ></TextField>
                <TextField
                    label="新しいパスワード"
                    value={updatedPassword.newPassword}
                    onChange={(e) =>
                        setUpdatedPassword((prevState) => ({
                            ...prevState,
                            newPassword: e.target.value,
                        }))
                    }
                ></TextField>
                <TextField
                    label="新しいパスワード(確認)"
                    value={updatedPassword.ConfirmNewPassword}
                    onChange={(e) =>
                        setUpdatedPassword((prevState) => ({
                            ...prevState,
                            ConfirmNewPassword: e.target.value,
                        }))
                    }
                ></TextField>
                <Box>
                    <Button variant="outlined" onClick={handleUpdatePass}>
                        更新
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};
