import { Typography } from "@/components/Typography";
import { AccountList } from "@/features/pilates/components/AccountList";

export const Account = () => {
    return (
        <>
            <Typography variant="h5">アカウント管理</Typography>
            <AccountList />
        </>
    );
};
