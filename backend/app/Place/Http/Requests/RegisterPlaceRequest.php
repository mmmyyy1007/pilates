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
            '*.name' => ['max:255'],
            '*.display_flag' => ['required', 'boolean'],
            '*.order_no' => ['required', 'integer'],
        ];
    }

    /**
     * カスタムエラーメッセージ
     */
    public function messages(): array
    {
        $messages = [];

        foreach ($this->input() as $index => $_) {
            $rowNumber = $index + 1;

            $messages["$index.name.max"] = "フォーム {$rowNumber}: 店舗名は255文字以内で指定してください。";
            $messages["$index.display_flag.required"] = "フォーム {$rowNumber}: 表示フラグは必須です。";
            $messages["$index.display_flag.boolean"] = "フォーム {$rowNumber}: 表示フラグには真偽値を指定してください。";
            $messages["$index.order_no.required"] = "フォーム {$rowNumber}: 表示順は必須です。";
            $messages["$index.order_no.integer"] = "フォーム {$rowNumber}: 表示順は整数で指定してください。";
        }

        return $messages;
    }
}
