<?php

namespace App\Place\Services;

use App\Place\Repositories\PlaceRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class PlaceService implements PlaceServiceInterface
{
    protected $placeRepository;

    public function __construct(PlaceRepositoryInterface $placeRepository)
    {
        $this->placeRepository = $placeRepository;
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
    public function getPlaceActiveById(int $userId): Collection
    {
        $place = $this->placeRepository->getPlaceActiveById($userId);

        return $place;
    }

    /**
     * @param array $placeData
     * @return bool
     */
    public function registerPlace(array $placeData): bool
    {
        // 新規の場合、ユニークIDを再設定
        $placeData = collect($placeData)->map(function ($item) {
            $exists = $this->placeRepository->existsPlaceById($item['user_id'], $item['id']);

            if (!$exists) {
                $item['id'] = Str::uuid();
            }
            return $item;
        })->toArray();

        // 店舗情報登録
        $status = $this->placeRepository->registerPlace($placeData);

        return $status;
    }
}
