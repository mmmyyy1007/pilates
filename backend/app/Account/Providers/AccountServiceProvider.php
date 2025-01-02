<?php

namespace App\Account\Providers;

use Illuminate\Support\ServiceProvider;

class AccountServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // インターフェースと実装クラスのバインディング
        $this->app->bind(
            \App\Account\Repositories\AccountRepositoryInterface::class,
            \App\Account\Repositories\AccountRepository::class
        );

        $this->app->bind(
            \App\Account\Services\AccountServiceInterface::class,
            \App\Account\Services\AccountService::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // ここには特になにも記載しない
    }
}
