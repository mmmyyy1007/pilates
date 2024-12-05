import { AuthUser } from "@/features/auth/types/authTypes";
import { apiClient } from "@/lib/apiClient";

/**
 * ログイン中のユーザー情報を取得する
 * @returns ユーザー情報(未認証の場合はnull)
 */
export const getUser = async (): Promise<AuthUser | null> => {
    try {
        const { data } = await apiClient.get<AuthUser>("/user");
        return data;
    } catch {
        return null; // 認証されていない場合はnull
    }
};
