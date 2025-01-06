import { DeletedPlaceData } from "@/features/pilates/types/placeTypes";
import { apiClient } from "@/lib/apiClient";

export const deletePlace = async (data: DeletedPlaceData): Promise<void> => {
    await apiClient.post<void>("place/delete", data);
};
