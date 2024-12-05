import { LoginCredentials } from "@/features/auth/types/authTypes";
import { apiClient } from "@/lib/apiClient";

/**
 * ログインAPIリクエスト
 * @param credentials ログイン情報(メールアドレス、パスワード)
 */
export const login = async (credentials: LoginCredentials) => {
    await apiClient.get("/sanctum/csrf-cookie");
    await apiClient.post("/login", credentials);
};
