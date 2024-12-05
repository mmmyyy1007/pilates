import { ROUTES } from "@/configs/routes";
import { checkResetToken, resetPassword } from "@/features/auth/api/resetPassword";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { ResetPasswordData, tokenCheckData } from "@/features/auth/types/authTypes";
import { useNavigate } from "react-router-dom";

/**
 * パスワードリセットカスタムフック
 */
export const useResetPassword = () => {
    const navigate = useNavigate();
    const { setLogout } = useAuthStore();

    const handleResetPassword = async (data: ResetPasswordData) => {
        await resetPassword(data);
        setLogout();
        alert("パスワードをリセットしました。");
        navigate(ROUTES.LOGIN);
    };

    const handleCheckResetToken = async (data: tokenCheckData) => {
        await checkResetToken(data);
    };

    return { handleResetPassword, handleCheckResetToken };
};
