import { ROUTES } from "@/configs/routes";
import { logout } from "@/features/auth/api/logout";
import { useAuthStore } from "@/features/auth/stores/authStore";

/**
 * ログアウトカスタムフック
 */
export const useLogout = () => {
    const { setLogout } = useAuthStore();
    const handleLogout = async () => {
        await logout();
        setLogout();
        window.location.href = ROUTES.LOGIN;
    };

    return { handleLogout };
};
