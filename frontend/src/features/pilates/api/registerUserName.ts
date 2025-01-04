import { AccountUserNameData } from "@/features/pilates/types/accountTypes";
import { apiClient } from "@/lib/apiClient";

export const registerUserName = async (data: AccountUserNameData): Promise<void> => {
    await apiClient.post<void>("account/update/name", data);
};
