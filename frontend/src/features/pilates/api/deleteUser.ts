import { apiClient } from "@/lib/apiClient";

export const deleteUser = async (): Promise<void> => {
    await apiClient.post<void>("account/delete");
};
