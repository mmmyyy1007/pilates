import { deletePlace } from "@/features/pilates/api/deletePlace";
import { registerPlace } from "@/features/pilates/api/registerPlace";
import { showActivePlace } from "@/features/pilates/api/showActivePlace";
import { showPlace } from "@/features/pilates/api/showPlace";
import { DeletedPlaceData, PlaceData } from "@/features/pilates/types/placeTypes";
import { useCallback } from "react";

export const usePlace = () => {
    const handleShowPlace = useCallback(async () => {
        return await showPlace();
    }, []);
    const handleRegisterPlace = async (data: PlaceData[]) => {
        await registerPlace(data);
    };
    const handleActiveShowPlace = useCallback(async () => {
        return await showActivePlace();
    }, []);
    const handleDeletePlace = async (data: DeletedPlaceData) => {
        return await deletePlace(data);
    };
    return { handleShowPlace, handleRegisterPlace, handleActiveShowPlace, handleDeletePlace };
};
