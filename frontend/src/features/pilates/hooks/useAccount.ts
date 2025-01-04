import { showAccount } from "@/features/pilates/api/showAccount";
import { updateUser } from "@/features/pilates/api/updateAccount";
import { UpdatedAccountData } from "@/features/pilates/types/accountTypes";

export const useAccount = () => {
    const handleShowAccount = async () => {
        return await showAccount();
    };
    const handleUpdateUser = async (data: UpdatedAccountData) => {
        await updateUser(data);
    };
    return { handleShowAccount, handleUpdateUser };
};
