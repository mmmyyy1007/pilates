import { RegisterData } from "@/features/auth/types/authTypes";
import { apiClient } from "@/lib/apiClient";

/**
 * ユーザー登録API
 * @param data 登録情報(ユーザー名、メールアドレス、パスワード、パスワード確認)
 */
export const register = async (data: RegisterData): Promise<void> => {
    await apiClient.get("/sanctum/csrf-cookie");
    await apiClient.post("/register", data);
};
