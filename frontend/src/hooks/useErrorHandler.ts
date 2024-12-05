import { useState } from "react";

/**
 * エラーレスポンスの型
 */
interface ApiErrorResponse {
    message: string; // 全体的なエラーメッセージ
    errors: Record<string, string[]>; // フィールドエラーメッセージ
}

/**
 * エラーがApiErrorResponse型かどうかを判定する型ガード
 * @param error エラーオブジェクト
 * @returns boolean
 */
const isApiErrorResponse = (error: unknown): error is ApiErrorResponse => {
    return typeof error === "object" && error !== null && "message" in error && "errors" in error;
};

/**
 * APIエラーハンドリングを共通化
 * @param error API呼び出しでスローされたエラー
 * @returns { message: string; errors: Record<string, string[]> }
 */
const handleApiError = (error: unknown): { message: string; errors: Record<string, string[]> } => {
    if (isApiErrorResponse(error)) {
        return {
            message: error.message,
            errors: error.errors,
        };
    }
    if (error instanceof Error) {
        return {
            message: error.message,
            errors: {},
        };
    }
    return {
        message: "予期しないエラーが発生しました。",
        errors: {},
    };
};

/**
 * APIエラーを管理するカスタムフック
 */
export const useErrorHandler = () => {
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [generalError, setGeneralError] = useState<string | null>(null);

    /**
     * APIエラーを処理してステートを更新
     * @param error APIエラーオブジェクト
     */
    const handleError = (error: unknown) => {
        const { message, errors } = handleApiError(error);
        setGeneralError(message);
        setErrors(errors);
    };

    /**
     * エラーステートをリセット
     */
    const resetErrors = () => {
        setErrors({});
        setGeneralError(null);
    };

    return {
        errors,
        generalError,
        handleError,
        resetErrors,
    };
};
