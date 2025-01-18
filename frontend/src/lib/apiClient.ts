import { ROUTES } from "@/configs/routes";
import { MESSAGES } from "@/constants/message";
import { useNotificationStore } from "@/stores/notificationStore";
import axios from "axios";

/**
 * 全体設定
 */
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // リクエストURL
    // timeout: 3000, // タイムアウト設定
    withCredentials: true, // リクエストヘッダーにCookieを含めることを許可する
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * リクエストインターセプター
 */
apiClient.interceptors.request.use(async (config) => {
    // CookieからCSRFトークンを取得し、ヘッダーに設定
    const xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN"))
        ?.split("=")[1];

    if (xsrfToken) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
    }

    return config;
});

/**
 * レスポンスインターセプター
 */
apiClient.interceptors.response.use(
    (response) => {
        if (response.config.method === "post") {
            const url = response.config.url;
            if (url !== "/login") {
                useNotificationStore.getState().setNotification(MESSAGES.registerSuccess, "success");
            }
        } else if (response.config.method === "delete") {
            useNotificationStore.getState().setNotification(MESSAGES.deleteSuccess, "success");
        }
        // ステータスコード2xxの場合、そのままレスポンスデータを返す
        return response;
    },
    async (error) => {
        // Axiosエラーかどうかを判定
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            // const method = error.config?.method;
            const message = error.response?.data.message;
            const errors = error.response?.data.errors;

            switch (status) {
                case 401:
                    // 認証不足
                    // useNotificationStore
                    //     .getState()
                    //     .setNotification("セッションが無効です。再ログインしてください。", "error");
                    // // alert("セッションが無効です。再ログインしてください。");
                    // window.location.href = ROUTES.LOGIN;
                    break;
                case 419:
                    // セッションやトークンエラー
                    useNotificationStore
                        .getState()
                        .setNotification("セッションが無効です。再ログインしてください。", "error");
                    // alert("セッションが無効です。再ログインしてください。");
                    setTimeout(() => {
                        window.location.href = ROUTES.LOGIN;
                    }, 2000);
                    break;
                case 422:
                    // バリデーションエラー
                    return Promise.reject({
                        message: message || "",
                        errors: errors || {},
                    });
                case 500:
                    // サーバーエラー
                    useNotificationStore.getState().setNotification("サーバーエラーが発生しました。", "error");
                    // alert("サーバーエラーが発生しました。");
                    // window.location.href = ROUTES.LOGIN;
                    break;
                default:
                    // その他のエラー
                    alert("予期しないエラーが発生しました。");
                    window.location.href = ROUTES.LOGIN;
                    break;
            }
        } else {
            // Axiosエラーでない場合（ネットワーク障害など）
            useNotificationStore
                .getState()
                .setNotification("ネットワークエラーが発生しました。インターネット接続を確認してください。", "error");
            // alert("ネットワークエラーが発生しました。インターネット接続を確認してください。");
        }
        return Promise.reject(error); // エラーを次に渡す
    },
);
