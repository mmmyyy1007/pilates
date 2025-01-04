import { AccountApiRespose, AccountData } from "@/features/pilates/types/accountTypes";
import { apiClient } from "@/lib/apiClient";

export const showAccount = async (): Promise<AccountData> => {
    const response = await apiClient.get<AccountApiRespose>("account/show");
    return response.data.account;
};
