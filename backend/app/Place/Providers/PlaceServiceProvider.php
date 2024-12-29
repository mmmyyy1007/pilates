<?php

namespace App\Place\Providers;

use Illuminate\Support\ServiceProvider;

class PlaceServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // インターフェースと実装クラスのバインディング
        $this->app->bind(
            \App\Place\Repositories\PlaceRepositoryInterface::class,
            \App\Place\Repositories\PlaceRepository::class
        );

        $this->app->bind(
            \App\Place\Services\PlaceServiceInterface::class,
            \App\Place\Services\PlaceService::class
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
