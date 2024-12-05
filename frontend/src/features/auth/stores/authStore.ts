import { AuthUser } from "@/features/auth/types/authTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 認証状態管理ストアの型
 */
interface AuthState {
    isLoggedIn: boolean;
    user: AuthUser | null;
    setLogin: (user: AuthUser) => void;
    setLogout: () => void;
}

/**
 * Zustandによる認証ストアの実装（永続化）
 */
export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            isLoggedIn: false, // ログインしているかどうか
            user: null, // ユーザー情報
            setLogin: (user) => set({ isLoggedIn: true, user }), // ログイン関数
            setLogout: () => set({ isLoggedIn: false, user: null }), // ログアウト関数
        }),
        {
            name: "auth-storage",
            storage: {
                getItem: (name) => {
                    const item = localStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
        },
    ),
);
