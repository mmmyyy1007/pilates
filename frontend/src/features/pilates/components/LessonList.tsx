import { Button } from "@/components/Button";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DateTimePicker } from "@mui/x-date-pickers";

export const LessonList = () => {
    const lessonPlace = ["STUDIO IVY 奥沢店"];
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5">レッスン一覧</Typography>
            <DateTimePicker label="開始日時" slotProps={{ textField: { size: "small", fullWidth: true } }} />
            <DateTimePicker label="終了日時" slotProps={{ textField: { size: "small", fullWidth: true } }} />
            <Autocomplete
                disablePortal
                options={lessonPlace}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="レッスン場所" />}
            />
            <Button variant="outlined">登録</Button>
        </Box>
    );
};
