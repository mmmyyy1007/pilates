import { Typography } from "@/components/Typography";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const LessonList = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5">レッスン一覧</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker label="Basic date time picker" />
                </DemoContainer>
            </LocalizationProvider>
        </Box>
    );
};
