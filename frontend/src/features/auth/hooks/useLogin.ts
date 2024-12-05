import { ROUTES } from "@/configs/routes";
import { getUser } from "@/features/auth/api/getUser";
import { login } from "@/features/auth/api/login";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { LoginCredentials } from "@/features/auth/types/authTypes";
import { useNavigate } from "react-router-dom";

/**
 * ログインカスタムフック
 */
export const useLogin = () => {
    const navigate = useNavigate();
    const { setLogin } = useAuthStore();

    const handleLogin = async (credentials: LoginCredentials) => {
        await login(credentials);
        const user = await getUser();
        if (user) {
            setLogin(user);
            navigate(ROUTES.HOME);
        } else {
            alert("ユーザー情報の取得に失敗しました。");
        }
    };
    return { handleLogin };
};
