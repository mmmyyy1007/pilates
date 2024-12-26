import { Button } from "@/components/Button";
import { TextField } from "@/components/TextFiled";
import { Typography } from "@/components/Typography";
import { apiClient } from "@/lib/apiClient";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Alert, Box, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { PlaceData } from "../types/placeTypes";

export const PlaceRegisterForm = () => {
    const [placeData, setPlaceData] = useState<PlaceData[]>([
        { id: 1, placeName: "test1", enabled: true, order: 1 },
        { id: 2, placeName: "test2", enabled: false, order: 2 },
        { id: 3, placeName: "test3", enabled: false, order: 3 },
    ]);
    const handlePlaceDataChange = (id: number, value: string) => {
        // console.log(id, value);
        setPlaceData(placeData.map((v) => (v.id === id ? { ...v, placeName: value } : v)));
    };
    const handlePlaceEnabledChange = (id: number) => {
        setPlaceData(placeData.map((v) => (v.id === id ? { ...v, enabled: !v.enabled } : v)));
    };
    const handleRegister = async () => {
        const response = await apiClient.post("/place/register");
        console.log(response);
    };
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const data = Array.from(placeData);
        const [recordedItem] = data.splice(result.source.index, 1);
        data.splice(result.destination.index, 0, recordedItem);
        const updatedItems = data.map((item, index) => ({
            ...item,
            order: index,
        }));
        setPlaceData(updatedItems);
    };
    const sortedData = [...placeData].sort((a, b) => a.order - b.order);
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5">店舗一覧</Typography>
            <Box>
                <Alert severity="success" onClose={() => {}}>
                    登録完了
                </Alert>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <Stack spacing={2} sx={{ mt: 3 }} {...provided.droppableProps} ref={provided.innerRef}>
                                {sortedData.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <Box
                                                // key={item.id}
                                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <Switch
                                                    color="success"
                                                    checked={item.enabled}
                                                    onChange={() => handlePlaceEnabledChange(item.id)}
                                                />
                                                <TextField
                                                    fullWidth
                                                    value={item.placeName}
                                                    error={item.id === 3}
                                                    onChange={(e) => handlePlaceDataChange(item.id, e.target.value)}
                                                ></TextField>
                                                <IconButton color="default" {...provided.dragHandleProps}>
                                                    <DragIndicatorIcon />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Stack>
                        )}
                    </Droppable>
                </DragDropContext>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <IconButton color="default">
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box sx={{ mt: 5 }}>
                    <Button variant="outlined" onClick={handleRegister}>
                        登録
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
