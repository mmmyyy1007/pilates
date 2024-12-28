import { PlaceData } from "@/features/pilates/types/placeTypes";
import { apiClient } from "@/lib/apiClient";

export const registerPlace = async (data: PlaceData[]): Promise<void> => {
    await apiClient.post<void>("place/register", data);
};
