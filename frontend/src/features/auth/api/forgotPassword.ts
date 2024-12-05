import { ForgotPasswordData } from "@/features/auth/types/authTypes";
import { apiClient } from "@/lib/apiClient";

/**
 * パスワードリセットリンク送信API
 * @param data パスワードリセット用のメールアドレス
 */
export const forgotPassword = async (data: ForgotPasswordData): Promise<void> => {
    await apiClient.get("/sanctum/csrf-cookie");
    await apiClient.post("/forgot-password", data);
};
