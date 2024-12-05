import { ROUTES } from "@/configs/routes";
import { getUser } from "@/features/auth/api/getUser";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { PasswordReset } from "@/pages/PasswordReset"; // パスワードリセットページをインポート
import { createBrowserRouter, Navigate, redirect, RouterProvider } from "react-router-dom";

/**
 * 認証済みルートのLoader
 * 認証が必要なページでは毎回user情報を取得しに行き、サーバーに存在するかどうかで認証済みかどうかを判定する
 */
const guardLoader = async () => {
    const user = await getUser();
    if (!user) {
        useAuthStore.getState().setLogout();
        throw redirect(ROUTES.LOGIN);
    } else {
        // ストアにユーザー情報を保存
        useAuthStore.getState().setLogin(user);
    }
    return null;
};

/**
 * ゲストLoader
 * 認証済みの状態でログイン画面に遷移した場合、2重ログインを防ぐためにホーム画面へリダイレクトする
 */
const guestLoader = async () => {
    const authStore = useAuthStore.getState();
    if (authStore.isLoggedIn && authStore.user) {
        throw redirect(ROUTES.HOME);
    }
    return null;
};

/**
 * ルーティング設定
 */
const router = createBrowserRouter([
    {
        path: ROUTES.LOGIN,
        loader: guestLoader,
        element: <Login />,
    },
    {
        path: ROUTES.HOME,
        loader: guardLoader,
        element: <Home />,
    },
    {
        path: ROUTES.PASSWORD_RESET,
        element: <PasswordReset />,
    },
    {
        path: "*",
        element: <Navigate to={ROUTES.LOGIN} replace />,
    },
]);

/**
 * ルータープロバイダー
 */
export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
