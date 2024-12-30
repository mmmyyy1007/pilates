<?php

namespace App\Lesson\Services;

use App\Lesson\Repositories\LessonRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class LessonService implements LessonServiceInterface
{
    protected $lessonRepository;

    public function __construct(LessonRepositoryInterface $lessonRepository)
    {
        $this->lessonRepository = $lessonRepository;
    }

    /**
     * @param int $userId
     * @return Collection
     */
    public function getPlaceById(int $userId): Collection
    {
        // 店舗情報取得
        $place = $this->lessonRepository->getPlaceById($userId);

        return $place;
    }

    /**
     * @param array $placeData
     * @return bool
     */
    // public function registerPlace(array $placeData): bool
    // {
    //     // 新規の場合、ユニークIDを再設定
    //     $placeData = collect($placeData)->map(function ($item) {
    //         if (strlen($item['id']) !== 36) {
    //             $item['id'] = Str::uuid();
    //         }
    //         return $item;
    //     })->toArray();

    //     // 店舗情報登録
    //     $status = $this->placeRepository->registerPlace($placeData);

    //     return $status;
    // }
}
