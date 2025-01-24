<?php

namespace App\Account\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterPasswordRequest extends FormRequest
{
    /**
     * 権限チェック（必要に応じて変更）
     */
    public function authorize(): bool
    {
        return true; // 必要に応じて認可ロジックを追加
    }

    /**
     * バリデーションルール
     */
    public function rules(): array
    {
        return [
            'password' => ['required'],
            'new_password' => ['required'],
            'confirm_new_password' => ['required'],
        ];
    }

    /**
     * カスタムエラーメッセージ
     */
    public function messages(): array
    {
        return [
            'password.required' => 'パスワードは必須です。',
            'new_password.required' => '新しいパスワードは必須です。',
            'confirm_new_password.required' => '新しいパスワード(確認用)は必須です。',
        ];
    }
}
