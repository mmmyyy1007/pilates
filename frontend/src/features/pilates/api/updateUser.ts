import { UpdatedAccountData } from "@/features/pilates/types/accountTypes";
import { apiClient } from "@/lib/apiClient";

export const updateUser = async (data: UpdatedAccountData): Promise<void> => {
    await apiClient.post<void>("account/update/user", data);
};
