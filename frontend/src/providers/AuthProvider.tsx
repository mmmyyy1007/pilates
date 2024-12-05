import { useAuthStore } from "@/features/auth/stores/authStore";
import { apiClient } from "@/lib/apiClient";
import React, { createContext, useCallback, useContext } from "react";

/**
 * 認証コンテキストの型
 */
interface AuthContextType {
    isLoggedIn: boolean;
    user: { id: string; name: string } | null;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 認証プロバイダー
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const { isLoggedIn, user, setLogin, setLogout } = useAuthStore();

    const fetchUser = useCallback(async () => {
        try {
            const response = await apiClient.get<{ id: string; name: string }>("/user");
            setLogin(response.data);
        } catch {
            setLogout();
        }
    }, [setLogin, setLogout]);

    return <AuthContext.Provider value={{ isLoggedIn, user, fetchUser }}>{children}</AuthContext.Provider>;
};

/**
 * 認証コンテキストを使用するカスタムフック
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
