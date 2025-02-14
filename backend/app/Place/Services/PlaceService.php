<?php

namespace App\Place\Services;

use App\Lesson\Repositories\LessonRepositoryInterface;
use App\Place\Repositories\PlaceRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class PlaceService implements PlaceServiceInterface
{
    protected $placeRepository;
    protected $lessonRepository;

    public function __construct(PlaceRepositoryInterface $placeRepository, LessonRepositoryInterface $lessonRepository)
    {
        $this->placeRepository = $placeRepository;
        $this->lessonRepository = $lessonRepository;
    }

    /**
     * @param int $userId
     * @return Collection
     */
    public function getPlaceById(int $userId): Collection
    {
        $place = $this->placeRepository->getPlaceById($userId);

        return $place;
    }

    /**
     * @param int $userId
     * @return Collection
     */
    public function getActivePlaceById(int  $userId): Collection
    {
        $place = $this->placeRepository->getActivePlaceById($userId);

        return $place;
    }

    /**
     * @param array $placeData
     * @param int $userId
     * @return bool
     */
    public function registerPlace(array $placeData): bool
    {
        $placeData = collect($placeData)->map(function ($item) {
            // 新規登録の場合、ユニークIDを再設定
            $exists = $this->placeRepository->existsPlaceById($item['user_id'], $item['id']);
            if (!$exists) {
                $item['id'] = Str::uuid();
            }

            return $item;
        })->toArray();

        // 店舗名が入力済の場合のみ保持
        $placeData = collect($placeData)->filter(function ($item) {
            return !is_null($item['name']);
        })->toArray();

        // 店舗情報登録
        $status = $this->placeRepository->registerPlace($placeData);

        return $status;
    }

    /**
     * @param string $placeId
     * @param int $userId
     * @return bool
     */
    public function deletePlace(string $placeId, int $userId): bool
    {

        // レッスンで登録されている店舗は削除できない
        $exists = $this->lessonRepository->existsLessonByPlaceId($userId, $placeId);

        if ($exists) {
            return false;
        }

        $status = $this->placeRepository->deletePlace($placeId, $userId);

        return $status;
    }
}
