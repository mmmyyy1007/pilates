import { ROUTES } from "@/configs/routes";
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
        // ステータスコード2xxの場合、そのままレスポンスデータを返す
        return response;
    },
    async (error) => {
        // Axiosエラーかどうかを判定
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            switch (status) {
                case 401:
                    // 認証不足
                    alert("セッションが無効です。再ログインしてください。");
                    window.location.href = ROUTES.LOGIN;
                    break;
                case 419:
                    // セッションやトークンエラー
                    alert("セッションが無効です。再ログインしてください。");
                    window.location.href = ROUTES.LOGIN;
                    break;
                case 422:
                    // バリデーションエラー
                    return Promise.reject({
                        message: error.response?.data?.message || "",
                        errors: error.response?.data?.errors || {},
                    });
                case 500:
                    // サーバーエラー
                    alert("サーバーエラーが発生しました。");
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
            alert("ネットワークエラーが発生しました。インターネット接続を確認してください。");
        }
        return Promise.reject(error); // エラーを次に渡す
    },
);
