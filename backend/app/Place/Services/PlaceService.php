<?php

namespace App\Place\Services;

use App\Place\Repositories\PlaceRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

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
        $placeData = collect($placeData)->map(function ($item) {
            $item['user_id'] = Auth::id();

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
     * @return bool
     */
    public function deletePlace(string $placeId): bool
    {

        $status = $this->placeRepository->deletePlace($placeId, Auth::id());

        return $status;
    }
}
