<?php

namespace App\Place\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterPlaceRequest extends FormRequest
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
            '*.name' => ['max:255', 'string'],
            '*.display_flag' => ['required', 'boolean'],
            '*.order_no' => ['required', 'integer'],
        ];
    }

    /**
     * カスタムエラーメッセージ
     */
    public function messages(): array
    {
        return [
            '*.name.string' => '店舗名を入力してください。',
            '*.name.max' => '店舗名は255文字以内で指定してください。',
            '*.display_flag.required' => '表示フラグは必須です。',
            '*.display_flag.boolean' => '表示フラグには真偽値を指定してください。',
            '*.order_no.required' => '表示順は必須です。',
            '*.order_no.integer' => '表示順は整数で指定してください。',
        ];
    }
}
