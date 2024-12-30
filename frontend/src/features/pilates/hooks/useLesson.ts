import { showLesson } from "@/features/pilates/api/showLesson";

export const useLesson = () => {
    const handleShowLesson = async () => {
        return await showLesson();
    };
    // const handleRegisterPlace = async (data: PlaceData[]) => {
    //     await registerPlace(data);
    // };
    return { handleShowLesson };
};
