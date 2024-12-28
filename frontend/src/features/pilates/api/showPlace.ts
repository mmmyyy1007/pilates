import { placeApiResponse, PlaceData } from "@/features/pilates/types/placeTypes";
import { apiClient } from "@/lib/apiClient";

export const showPlace = async (): Promise<PlaceData[]> => {
    const response = await apiClient.get<placeApiResponse>("place/show");
    return response.data.place;
};
