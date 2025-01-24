import { deleteUser } from "@/features/pilates/api/deleteUser";
import { showAccount } from "@/features/pilates/api/showAccount";
import { updateEmail } from "@/features/pilates/api/updateEmail";
import { updateName } from "@/features/pilates/api/updateName";
import { updatePassword } from "@/features/pilates/api/updatePassword";
import { UpdatedAccountData, UpdatedPasswordData } from "@/features/pilates/types/accountTypes";

export const useAccount = () => {
    const handleShowAccount = async () => {
        return await showAccount();
    };
    const handleUpdateName = async (data: UpdatedAccountData) => {
        await updateName(data);
    };
    const handleUpdateEmail = async (data: UpdatedAccountData) => {
        await updateEmail(data);
    };
    const handleUpdatePassword = async (data: UpdatedPasswordData) => {
        await updatePassword(data);
    };
    const handleDeleteUser = async () => {
        await deleteUser();
    };
    return { handleShowAccount, handleUpdateName, handleUpdateEmail, handleUpdatePassword, handleDeleteUser };
};
