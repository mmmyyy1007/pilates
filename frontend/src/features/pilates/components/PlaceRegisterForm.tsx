import { Dialog } from "@/components/Dialog";
import { Snackbar } from "@/components/Snackbar";
import { TextField } from "@/components/TextFiled";
import { MESSAGES } from "@/constants/message";
import { PlaceRegisterButton } from "@/features/pilates/components/place";
import { usePlace } from "@/features/pilates/hooks/usePlace";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box, FormControl, FormHelperText, IconButton, Tooltip } from "@mui/material";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { useCallback, useEffect, useState } from "react";
import { PlaceData } from "../types/placeTypes";

export const PlaceRegisterForm = () => {
    const [placeData, setPlaceData] = useState<PlaceData[]>([]);
    const [clickedId, setClickedId] = useState<string>("");
    const [alertSeverity, setAlertServerity] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [openRegister, setOpenRegister] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const { handleShowPlace, handleRegisterPlace, handleDeletePlace } = usePlace();
    const { errors, handleError, resetErrors } = useErrorHandler();

    const fetchPlaceData = useCallback(async () => {
        /**
         * 店舗一覧取得
         */
        const response = await handleShowPlace();

        if (response.length === 0) {
            // 初期表示
            setPlaceData([
                { id: Date.now().toString(), name: "", displayFlag: false, orderNo: 0 },
                { id: (Date.now() + 1).toString(), name: "", displayFlag: false, orderNo: 1 },
                { id: (Date.now() + 2).toString(), name: "", displayFlag: false, orderNo: 2 },
            ]);
        } else {
            setPlaceData(response);
        }
    }, [handleShowPlace]);

    useEffect(() => {
        fetchPlaceData();
    }, [fetchPlaceData]);

    /**
     * 入力フォームデータ変更
     *
     * @param id
     * @param value
     */
    const handlePlaceDataChange = (id: string, value: string) => {
        setPlaceData(placeData.map((v) => (v.id === id ? { ...v, name: value, displayFlag: value !== "" } : v)));
    };

    /**
     * 表示・非表示設定
     *
     * @param id
     */
    const handlePlaceEnabledChange = (id: string) => {
        setPlaceData(placeData.map((v) => (v.id === id ? { ...v, displayFlag: !v.displayFlag } : v)));
    };

    /**
     * 選択した削除ボタン設定
     * @param e
     */
    const handleDeleteModal = (e: React.FormEvent) => {
        const id = e.currentTarget.id;
        setClickedId(id);
        setOpenDelete(true);
    };

    /**
     * 入力フォーム並び替え
     *
     * @param result
     * @returns
     */
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const data = Array.from(placeData);
        const [recordedItem] = data.splice(result.source.index, 1);
        data.splice(result.destination.index, 0, recordedItem);
        const updatedItems = data.map((item, index) => ({
            ...item,
            orderNo: index,
        }));
        setPlaceData(updatedItems);
    };
    const sortedData = [...placeData].sort((a, b) => a.orderNo - b.orderNo);

    /**
     * 入力フォーム追加
     */
    const handleAddField = () => {
        const tempId = Date.now().toString();
        const nextOrderNo = placeData.length ? Math.max(...placeData.map((item) => item.orderNo)) + 1 : 0;
        setPlaceData([...placeData, { id: tempId, name: "", displayFlag: false, orderNo: nextOrderNo }]);
    };

    /**
     * 入力フォームエラー表示
     *
     * @param orderNo
     * @param field
     * @returns
     */
    const getFieldError = (index: number, field: string): string | undefined => {
        const key = `${index}.${field}`;
        return errors[key]?.[0];
    };

    /**
     * 店舗登録処理
     *
     * @param e
     */
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        try {
            await handleRegisterPlace(placeData);
            setAlertServerity("success");
            setAlertMessage(MESSAGES.registerSuccess);
            await fetchPlaceData();
        } catch (error) {
            setAlertServerity("error");
            setAlertMessage(MESSAGES.registerError);
            handleError(error);
        } finally {
            setOpenRegister(false);
        }
    };

    /**
     * 店舗削除処理
     *
     * @param e
     */
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        resetErrors();

        try {
            await handleDeletePlace({ id: clickedId });
            setAlertServerity("success");
            setAlertMessage(MESSAGES.deleteSuccess);
            await fetchPlaceData();
        } catch (error) {
            setAlertServerity("error");
            setAlertMessage(MESSAGES.deleteError);
            handleError(error);
        } finally {
            setOpenDelete(false);
        }
    };

    /**
     * スナックバー非表示
     */
    const handleClose = () => {
        setAlertMessage(null);
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Box>
                {alertMessage && <Snackbar message={alertMessage} severity={alertSeverity} onClose={handleClose} />}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <Stack spacing={2} sx={{ mt: 3 }} {...provided.droppableProps} ref={provided.innerRef}>
                                {sortedData.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <Box
                                                key={item.id}
                                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <Switch
                                                    color="success"
                                                    checked={!!item.displayFlag}
                                                    onChange={() => handlePlaceEnabledChange(item.id)}
                                                />
                                                <FormControl
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!getFieldError(index, "name")}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        value={item.name}
                                                        error={!!getFieldError(index, "name")}
                                                        onChange={(e) => handlePlaceDataChange(item.id, e.target.value)}
                                                        label="店舗名"
                                                    />
                                                    {getFieldError(index, "name") && (
                                                        <FormHelperText>{getFieldError(index, "name")}</FormHelperText>
                                                    )}
                                                </FormControl>
                                                <Tooltip title="削除" arrow>
                                                    <IconButton
                                                        color="default"
                                                        id={item.id}
                                                        onClick={handleDeleteModal}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Dialog
                                                    open={openDelete && item.id === clickedId}
                                                    title="店舗削除前にご確認ください。"
                                                    content="下記の削除するボタンを押すと店舗削除手続きを実行します。レッスン場所として登録している場合は削除されません。"
                                                    cancel="削除しない"
                                                    confirm="削除する"
                                                    onClose={() => setOpenDelete(false)}
                                                    onConfirm={handleDelete}
                                                />
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
                    <IconButton color="default" onClick={handleAddField}>
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box sx={{ mt: 5 }}>
                    <PlaceRegisterButton
                        openRegister={openRegister}
                        setOpenRegister={setOpenRegister}
                        handleRegister={handleRegister}
                    />
                </Box>
            </Box>
        </Box>
    );
};
