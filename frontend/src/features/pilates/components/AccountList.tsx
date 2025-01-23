import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
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
import { Box, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";

export const AccountList = () => {
    const [openUser, setOpenUser] = useState<boolean>(false);
    const [openPassword, setOpenPassword] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openRegister, setOpenRegister] = useState<boolean>(false);
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
        const data: UpdatedAccountData = { key: updateFormName.key, data: updateFormName.value };
        await handleUpdateUser(data);
        setOpenRegister(false);
        setOpenUser(false);
    };

    /**
     * パスワード変更
     * @param e
     */
    const handleUpdatePass = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleUpdatePassword(updatedPassword);
        setOpenRegister(false);
        setOpenPassword(false);
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
            <AccountUserModal
                openUser={openUser}
                setOpenUser={setOpenUser}
                openRegister={openRegister}
                setOpenRegister={setOpenRegister}
                updateFormName={updateFormName}
                setupdateFormName={setupdateFormName}
                handleUpdate={handleUpdate}
            />
            <AccountPasswordModal
                openPassword={openPassword}
                setOpenPassword={setOpenPassword}
                openRegister={openRegister}
                setOpenRegister={setOpenRegister}
                updatedPassword={updatedPassword}
                handleChangePasswordForm={handleChangePasswordForm}
                handleUpdatePass={handleUpdatePass}
            />
        </Box>
    );
};
