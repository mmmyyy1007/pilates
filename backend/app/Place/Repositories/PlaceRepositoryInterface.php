<?php

namespace App\Place\Repositories;

use Illuminate\Database\Eloquent\Collection;

interface PlaceRepositoryInterface
{
    /**
     * @param int $userId
     * @return Collection
     */
    public function getPlaceById(int $userId): Collection;

    /**
     * @param int $userId
     * @param string $placeId
     * @param bool
     */
    public function existsPlaceById(int $userId, string $placeId): bool;

    /**
     * @param int $userId
     * @param Collection
     */
    public function getPlaceActiveById(int $userId): Collection;

    /**
     * @param array $placeData
     * @return bool
     */
    public function registerPlace(array $placeData): bool;
}
