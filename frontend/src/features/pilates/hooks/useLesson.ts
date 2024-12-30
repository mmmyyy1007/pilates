// import { registerPlace } from "@/features/pilates/api/registerPlace";
import { showLessonPlace } from "@/features/pilates/api/showLessonPlace";
// import { LessonPlaceData } from "@/features/pilates/types/lessonTypes";

export const useLessonPlace = () => {
    const handleShowLessonPlace = async () => {
        return await showLessonPlace();
    };
    // const handleRegisterPlace = async (data: PlaceData[]) => {
    //     await registerPlace(data);
    // };
    return { handleShowLessonPlace };
};
