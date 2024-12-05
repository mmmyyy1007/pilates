import { forgotPassword } from "@/features/auth/api/forgotPassword";
import { ForgotPasswordData } from "@/features/auth/types/authTypes";

/**
 * パスワード忘れカスタムフック
 */
export const useForgotPassword = () => {
    const handleForgotPassword = async (data: ForgotPasswordData) => {
        await forgotPassword(data);
        alert("リセットリンクが送信されました。メールを確認してください。");
    };
    return { handleForgotPassword };
};
