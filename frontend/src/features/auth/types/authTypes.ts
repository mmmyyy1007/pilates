/**
 * ログイン情報
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * ユーザー登録情報
 */
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

/**
 * パスワードリセットリンク送信情報
 */
export interface ForgotPasswordData {
    email: string;
}

/**
 * パスワードリセット情報
 */
export interface ResetPasswordData {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

/**
 * ユーザー情報
 */
export interface AuthUser {
    id: string;
    name: string;
}

/**
 * トークンチェック情報
 */
export interface tokenCheckData {
    token: string;
    email: string;
}
