import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { AccountPasswordModal, AccountUserForm, AccountUserModal } from "@/features/pilates/components/account";
import { useAccount } from "@/features/pilates/hooks/useAccount";
import {
    AccountData,
    AccountFormData,
    UpdatedAccountData,
    UpdatedPasswordData,
} from "@/features/pilates/types/accountTypes";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";

export const AccountList = () => {
    const [openUser, setOpenUser] = useState<boolean>(false);
    const [openPassword, setOpenPassword] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [accountData, setAccountData] = useState<AccountData>({ name: "", date: "", email: "" });
    const [updateFormName, setupdateFormName] = useState<AccountFormData>({ key: "", name: "", value: "" });
    const { handleShowAccount, handleUpdateUser, handleUpdatePassword, handleDeleteUser } = useAccount();
    const { handleError, resetErrors } = useErrorHandler();
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
    const handleModalOpenUser = (e: MouseEvent<HTMLButtonElement>) => {
        const ariaLabel = e.currentTarget.getAttribute("aria-label");
        const dataKey = e.currentTarget.getAttribute("data-key");
        const value = accountData[dataKey as keyof AccountData];
        setupdateFormName({ key: dataKey, name: ariaLabel, value: value });
        setOpenUser(true);
    };

    /**
     * 更新用モーダル表示(パスワード)
     */
    const handleModalOpenPassword = () => {
        setOpenPassword(true);
    };

    /**
     * 退会ダイアログ表示
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /**
     * 退会ダイアログ非表示
     */
    const handleClickClose = () => {
        setOpen(false);
    };

    /**
     * パスワードフォーム内変更
     * @param e
     */
    const handleChangePasswordForm = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedPassword((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    /**
     * ログインユーザー変更
     * @param e
     */
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setOpenUser(false);
        const data: UpdatedAccountData = { key: updateFormName.key, data: updateFormName.value };
        await handleUpdateUser(data);
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

    /**
     * 退会
     */
    const handleDeleteAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        try {
            setOpen(false);
            await handleDeleteUser();
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Box>
                            <AccountCircleIcon fontSize="large" />
                        </Box>
                    </Grid>
                    <Grid size={8}>
                        <AccountUserForm
                            value={accountData.name}
                            label="名前"
                            dataKey="name"
                            handleModalOpenUser={handleModalOpenUser}
                        />
                        <Typography>start ～ {accountData.date}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <AccountUserForm
                    value={accountData.email}
                    label="メールアドレス"
                    dataKey="email"
                    handleModalOpenUser={handleModalOpenUser}
                />
            </Box>
            <Box>
                <Typography>
                    *******
                    <IconButton color="default" onClick={() => handleModalOpenPassword()}>
                        <CreateIcon />
                    </IconButton>
                </Typography>
            </Box>
            <Box>
                <Button variant="outlined" onClick={handleClickOpen}>
                    退会
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"退会手続き前にご確認ください。"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            下記の退会するボタンを押すと退会手続きを実行します。
                            <br />
                            登録したすべての情報が削除されますが、よろしいでしょうか。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClickClose}>
                            退会しない
                        </Button>
                        <Button variant="outlined" color="error" autoFocus onClick={handleDeleteAccount}>
                            退会する
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <AccountUserModal
                openUser={openUser}
                setOpenUser={setOpenUser}
                updateFormName={updateFormName}
                setupdateFormName={setupdateFormName}
                handleUpdate={handleUpdate}
            />
            <AccountPasswordModal
                openPassword={openPassword}
                setOpenPassword={setOpenPassword}
                updatedPassword={updatedPassword}
                handleChangePasswordForm={handleChangePasswordForm}
                handleUpdatePass={handleUpdatePass}
            />
        </Box>
    );
};
