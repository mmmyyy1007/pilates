<?php

namespace App\Lesson\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterLessonRequest extends FormRequest
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
            // 'place' => ['required'],
            'place_id' => ['required'],
            'start_datetime' => ['required'],
            'end_datetime' => ['required'],
            'id' => ['required'],
        ];
    }

    /**
     * カスタムエラーメッセージ
     */
    public function messages(): array
    {
        return [
            // 'place.required' => 'レッスン場所は必須です。',
            'place_id.required' => 'レッスン場所は必須です。',
            'start_datetime.required' => '開始時間を選択してください。',
            'end_datetime.required' => '終了時間を選択してください。',
        ];
    }
}
