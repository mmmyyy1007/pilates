import { registerUserName } from "@/features/pilates/api/registerUserName";
import { showAccount } from "@/features/pilates/api/showAccount";
import { AccountUserNameData } from "@/features/pilates/types/accountTypes";

export const useAccount = () => {
    const handleShowAccount = async () => {
        return await showAccount();
    };
    const handleRegisterUserName = async (data: AccountUserNameData) => {
        await registerUserName(data);
    };
    return { handleShowAccount, handleRegisterUserName };
};
