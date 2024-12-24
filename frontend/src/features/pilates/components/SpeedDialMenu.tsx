import { ROUTES } from "@/configs/routes";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import { Box } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SpeedDialMenu = () => {
    const actions = [
        { icon: <CalendarTodayIcon />, name: "レッスン一覧", path: ROUTES.LESSON },
        { icon: <PlaceIcon />, name: "店舗一覧", path: ROUTES.PLACE },
        { icon: <PersonIcon />, name: "アカウント管理", path: ROUTES.USER },
    ];
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    return (
        <Box>
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => navigate(action.path)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
};
