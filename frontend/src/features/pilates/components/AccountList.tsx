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
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";

export const AccountList = () => {
    const [openUser, setOpenUser] = useState<boolean>(false);
    const [openPassword, setOpenPassword] = useState<boolean>(false);
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
                <Button variant="outlined" onClick={handleDeleteAccount}>
                    退会
                </Button>
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
