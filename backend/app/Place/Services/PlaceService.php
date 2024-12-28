<?php

namespace App\Place\Services;

use App\Place\Repositories\PlaceRepositoryInterface;

class PlaceService implements PlaceServiceInterface
{
    protected $placeRepository;

    public function __construct(PlaceRepositoryInterface $placeRepository)
    {
        $this->placeRepository = $placeRepository;
    }

    /**
     * @param int $userId
     * @return array
     */
    public function getPlaceById(int $userId): array
    {
        // リポジトリを使用して店舗情報を取得
        $place = $this->placeRepository->getPlaceById($userId);

        // ここにビジネスロジックを追加する
        // 例：学生が退学などを理由に在籍していない場合は、非アクティブとしてマークする、等

        // 店舗情報を配列として返す
        return $place->toArray();
    }
}
