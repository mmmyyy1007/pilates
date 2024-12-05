import { register } from "@/features/auth/api/register";
import { RegisterData } from "@/features/auth/types/authTypes";

/**
 * ユーザー登録カスタムフック
 */
export const useRegister = () => {
    const handleRegister = async (data: RegisterData) => {
        await register(data);
        alert("ユーザー登録が完了しました。");
    };
    return { handleRegister };
};
