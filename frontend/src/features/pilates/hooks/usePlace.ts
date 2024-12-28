import { registerPlace } from "@/features/pilates/api/registerPlace";
import { showPlace } from "@/features/pilates/api/showPlace";
import { PlaceData } from "@/features/pilates/types/placeTypes";

export const usePlace = () => {
    const handleShowPlace = async () => {
        return await showPlace();
    };
    const handleRegisterPlace = async (data: PlaceData[]) => {
        await registerPlace(data);
    };
    return { handleShowPlace, handleRegisterPlace };
};
