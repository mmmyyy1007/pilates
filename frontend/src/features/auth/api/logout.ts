import { apiClient } from "@/lib/apiClient";

/**
 * ログアウトAPI
 */
export const logout = async (): Promise<void> => {
    await apiClient.post("/logout");
};
