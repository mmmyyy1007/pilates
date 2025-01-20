import { TextField } from "@/components/TextFiled";
import { LessonStartEndData } from "@/features/pilates/types/lessonTypes";
import { ActivePlaceData } from "@/features/pilates/types/placeTypes";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, IconButton, Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

interface LessonInputGroupProps {
    startEndData: LessonStartEndData;
    setStartEndData: React.Dispatch<React.SetStateAction<LessonStartEndData>>;
    selectedPlaceData: ActivePlaceData | null;
    activePlaceData: ActivePlaceData[];
    setSelectedPlaceData: React.Dispatch<React.SetStateAction<ActivePlaceData | null>>;
    handleModalClose: () => void;
}
export const LessonInputGroup = ({
    startEndData,
    setStartEndData,
    selectedPlaceData,
    activePlaceData,
    setSelectedPlaceData,
    handleModalClose,
}: LessonInputGroupProps) => {
    return (
        <Stack spacing={2}>
            <IconButton
                aria-label="close"
                onClick={handleModalClose}
                style={{ position: "absolute", right: 4, top: 4 }}
            >
                <CloseIcon />
            </IconButton>
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
