<?php

namespace App\Account\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterNameRequest extends FormRequest
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
            'value' => ['required'],
        ];
    }

    /**
     * カスタムエラーメッセージ
     */
    public function messages(): array
    {
        return [
            'value.required' => 'ユーザー名は必須です。',
        ];
    }
}
