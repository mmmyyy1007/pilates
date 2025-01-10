import { Loading } from "@/components/Loading";
import { ROUTES } from "@/configs/routes";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/features/auth/stores/authStore";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PlaceIcon from "@mui/icons-material/Place";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
    const { handleLogout } = useLogout();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    /**
     * ログアウト処理
     */
    const onClick = async () => {
        await handleLogout();
    };

    /**
     * メニュー開閉
     */
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    if (!user) {
        return <Loading />;
    }

    const menu = [
        { icon: <HomeIcon />, name: "ホーム", path: ROUTES.HOME },
        { icon: <CalendarTodayIcon />, name: "レッスン一覧", path: ROUTES.LESSON },
        { icon: <PlaceIcon />, name: "店舗一覧", path: ROUTES.PLACE },
        { icon: <PersonIcon />, name: "アカウント管理", path: ROUTES.ACCOUNT },
        { icon: <LogoutIcon />, name: "ログアウト", path: "" },
    ];

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {menu.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={item.path === "" ? onClick : () => navigate(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "20px", fontWeight: 500 }}>
                        Pilates 30
                    </Typography>
                    <Typography
                        component="div"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <PersonOutlineIcon sx={{ marginRight: "0.5rem" }} />
                        {user.name}さん
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 3 }}>
                <Outlet />
            </Container>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
};
