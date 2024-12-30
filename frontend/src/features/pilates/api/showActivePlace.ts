import { ActivePlaceApiResponse, ActivePlaceData } from "@/features/pilates/types/placeTypes";
import { apiClient } from "@/lib/apiClient";

export const showActivePlace = async (): Promise<ActivePlaceData[]> => {
    const response = await apiClient.get<ActivePlaceApiResponse>("place/show/active");
    return response.data.place;
};
