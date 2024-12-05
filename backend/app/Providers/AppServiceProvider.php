<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // 必要なサービスの登録処理
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * パスワードリセット通知メールのリンクを
         * カスタムフロントエンドURLを使用して生成する。
         */
        ResetPassword::toMailUsing(function ($notifiable, string $token) {
            // 環境変数またはconfigからフロントエンドURLを取得
            $frontendUrl = config('app.frontend_url', env('FRONTEND_URL', 'http://localhost:5173'));

            // リセットリンクを生成
            $resetUrl = "{$frontendUrl}/reset-password/{$token}?email=" . urlencode($notifiable->getEmailForPasswordReset());

            // メールメッセージを作成して返却
            return (new MailMessage)
                ->subject(__('パスワードリセット通知'))
                ->line(__('このメールは、パスワードリセットリクエストを受信したため送信されています。'))
                ->action(__('パスワードをリセットする'), $resetUrl)
                ->line(__('このリンクの有効期限は :count 分です。', ['count' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire')]))
                ->line(__('もしこのリクエストに覚えがない場合、何もする必要はありません。'));
        });
    }
}
