import { UpdatedPasswordData } from "@/features/pilates/types/accountTypes";
import { apiClient } from "@/lib/apiClient";

export const updatePassword = async (data: UpdatedPasswordData): Promise<void> => {
    await apiClient.post<void>("account/update/password", data);
};
