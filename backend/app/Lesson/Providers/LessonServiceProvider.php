<?php

namespace App\Lesson\Providers;

use Illuminate\Support\ServiceProvider;

class LessonServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // インターフェースと実装クラスのバインディング
        $this->app->bind(
            \App\Lesson\Repositories\LessonRepositoryInterface::class,
            \App\Lesson\Repositories\LessonRepository::class
        );

        $this->app->bind(
            \App\Lesson\Services\LessonServiceInterface::class,
            \App\Lesson\Services\LessonService::class
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
