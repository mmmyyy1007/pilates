import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Typography } from "@/components/Typography";
import { AccountPasswordModal, AccountUserForm } from "@/features/pilates/components/account";
import { useAccount } from "@/features/pilates/hooks/useAccount";
import { AccountData, UpdatedPasswordData } from "@/features/pilates/types/accountTypes";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { ChangeEvent, useEffect, useState } from "react";

export const AccountList = () => {
    const [openPassword, setOpenPassword] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openRegisterName, setOpenRegisterName] = useState<boolean>(false);
    const [openRegisterEmail, setOpenRegisterEmail] = useState<boolean>(false);
    const [openRegisterPassword, setOpenRegisterPassword] = useState<boolean>(false);
    const [accountData, setAccountData] = useState<AccountData>({ name: "", date: "", email: "" });
    const [updatedPassword, setUpdatedPassword] = useState<UpdatedPasswordData>({
        password: "",
        newPassword: "",
        ConfirmNewPassword: "",
    });
    const { handleShowAccount, handleUpdateName, handleUpdateEmail, handleUpdatePassword, handleDeleteUser } =
        useAccount();
    const { errors, handleError, resetErrors } = useErrorHandler();

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
     * ユーザー名・メールアドレスフォーム内変更
     */
    const handleChangeUserForm = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;
        setAccountData((prev) => ({
            ...prev,
            [id]: value,
        }));
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
     * ユーザー名変更
     * @param e
     */
    const handleUpdateUserName = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        try {
            await handleUpdateName({ value: accountData.name });
        } catch (error) {
            handleError(error);
        } finally {
            setOpenRegisterName(false);
        }
    };

    /**
     * メールアドレス変更
     * @param e
     */
    const handleUpdateUserEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        try {
            await handleUpdateEmail({ value: accountData.email });
        } catch (error) {
            handleError(error);
        } finally {
            setOpenRegisterEmail(false);
        }
    };

    /**
     * パスワード変更
     * @param e
     */
    const handleUpdatePass = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        try {
            await handleUpdatePassword(updatedPassword);
            setOpenPassword(false);
        } catch (error) {
            handleError(error);
        } finally {
            setOpenRegisterPassword(false);
        }
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
                            id="name"
                            openRegister={openRegisterName}
                            setOpenRegister={setOpenRegisterName}
                            handleUpdate={handleUpdateUserName}
                            handleChangeUserForm={handleChangeUserForm}
                        />
                        <Typography>start ～ {accountData.date}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <AccountUserForm
                    value={accountData.email}
                    label="メールアドレス"
                    id="email"
                    openRegister={openRegisterEmail}
                    setOpenRegister={setOpenRegisterEmail}
                    handleUpdate={handleUpdateUserEmail}
                    handleChangeUserForm={handleChangeUserForm}
                />
            </Box>
            <Box>
                <Link href="#" underline="hover" onClick={() => setOpenPassword(true)}>
                    パスワード変更はこちら
                </Link>
            </Box>
            <Box>
                <Button variant="outlined" onClick={() => setOpen(true)}>
                    退会
                </Button>
                <Dialog
                    open={open}
                    title="退会手続き前にご確認ください。"
                    content="下記の退会するボタンを押すと退会手続きを実行します。登録したすべての情報が削除されますが、よろしいでしょうか。"
                    cancel="退会しない"
                    confirm="退会する"
                    onClose={() => setOpen(false)}
                    onConfirm={handleDeleteAccount}
                />
            </Box>
            <AccountPasswordModal
                openPassword={openPassword}
                setOpenPassword={setOpenPassword}
                openRegisterPassword={openRegisterPassword}
                setOpenRegisterPassword={setOpenRegisterPassword}
                updatedPassword={updatedPassword}
                handleChangePasswordForm={handleChangePasswordForm}
                handleUpdatePass={handleUpdatePass}
                errors={errors}
            />
        </Box>
    );
};
