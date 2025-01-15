import { TextField } from "@/components/TextFiled";
import { LessonStartEndData } from "@/features/pilates/types/lessonTypes";
import { ActivePlaceData } from "@/features/pilates/types/placeTypes";
import { Autocomplete, Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

interface LessonInputGroupProps {
    startEndData: LessonStartEndData;
    setStartEndData: React.Dispatch<React.SetStateAction<LessonStartEndData>>;
    selectedPlaceData: ActivePlaceData | null;
    activePlaceData: ActivePlaceData[];
    setSelectedPlaceData: React.Dispatch<React.SetStateAction<ActivePlaceData | null>>;
}
export const LessonInputGroup = ({
    startEndData,
    setStartEndData,
    selectedPlaceData,
    activePlaceData,
    setSelectedPlaceData,
}: LessonInputGroupProps) => {
    return (
        <Stack spacing={2}>
            <DateTimePicker
                label="開始日時"
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                value={startEndData.start}
                onChange={(newStartDate) =>
                    setStartEndData((prevState) => ({
                        ...prevState,
                        start: newStartDate,
                    }))
                }
            />
            <DateTimePicker
                label="終了日時"
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                value={startEndData.end}
                onChange={(newEndDate) =>
                    setStartEndData((prevState) => ({
                        ...prevState,
                        end: newEndDate,
                    }))
                }
            />
            <Autocomplete
                disablePortal
                noOptionsText=""
                value={selectedPlaceData}
                options={activePlaceData}
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 300 }}
                onChange={(_, newValue) => setSelectedPlaceData(newValue)}
                renderInput={(params) => <TextField {...params} label="レッスン場所" />}
            />
        </Stack>
    );
};
