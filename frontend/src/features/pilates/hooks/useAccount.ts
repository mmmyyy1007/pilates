import { showAccount } from "@/features/pilates/api/showAccount";
import { updatePassword } from "@/features/pilates/api/updatePassword";
import { updateUser } from "@/features/pilates/api/updateUser";
import { UpdatedAccountData, UpdatedPasswordData } from "@/features/pilates/types/accountTypes";

export const useAccount = () => {
    const handleShowAccount = async () => {
        return await showAccount();
    };
    const handleUpdateUser = async (data: UpdatedAccountData) => {
        await updateUser(data);
    };
    const handleUpdatePassword = async (data: UpdatedPasswordData) => {
        await updatePassword(data);
    };
    return { handleShowAccount, handleUpdateUser, handleUpdatePassword };
};
