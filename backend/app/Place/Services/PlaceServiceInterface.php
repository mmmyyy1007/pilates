<?php

namespace App\Place\Services;

use Illuminate\Database\Eloquent\Collection;

interface PlaceServiceInterface
{

    /**
     * @param int $userId
     * @return Collection
     */
    public function getPlaceById(int $userId): Collection;

    /**
     * @param int $userId
     * @return Collection
     */
    public function getPlaceActiveById(int $userId): Collection;

    /**
     * @param array $placeData
     * @return bool
     */
    public function registerPlace(array $placeData): bool;

    /**
     * @param string $placeId
     * @return bool
     */
    public function deletePlace(string $placeId): bool;
}
