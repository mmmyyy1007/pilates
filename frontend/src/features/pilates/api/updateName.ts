import { UpdatedAccountData } from "@/features/pilates/types/accountTypes";
import { apiClient } from "@/lib/apiClient";

export const updateName = async (data: UpdatedAccountData): Promise<void> => {
    await apiClient.post<void>("account/update/name", data);
};
