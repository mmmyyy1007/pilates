import { Button } from "@/components/Button";
import { useLogout } from "@/features/auth/hooks/useLogout";

/**
 * ログアウトボタン
 */
export const LogoutButton = () => {
    const { handleLogout } = useLogout();

    /**
     * ログアウト処理
     */
    const onClick = async () => {
        await handleLogout();
    };

    return (
        <Button variant="outlined" color="secondary" onClick={onClick}>
            ログアウト
        </Button>
    );
};
