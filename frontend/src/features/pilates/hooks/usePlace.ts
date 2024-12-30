import { registerPlace } from "@/features/pilates/api/registerPlace";
import { showActivePlace } from "@/features/pilates/api/showActivePlace";
import { showPlace } from "@/features/pilates/api/showPlace";
import { PlaceData } from "@/features/pilates/types/placeTypes";

export const usePlace = () => {
    const handleShowPlace = async () => {
        return await showPlace();
    };
    const handleRegisterPlace = async (data: PlaceData[]) => {
        await registerPlace(data);
    };
    const handleActiveShowPlace = async () => {
        return await showActivePlace();
    };
    return { handleShowPlace, handleRegisterPlace, handleActiveShowPlace };
};
