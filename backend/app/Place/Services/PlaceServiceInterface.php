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
    public function getActivePlaceById(int $userId): Collection;

    /**
     * @param array $placeData
     * @param int $userId
     * @return bool
     */
    public function registerPlace(array $placeData): bool;

    /**
     * @param string $placeId
     * @param int $userId
     * @return bool
     */
    public function deletePlace(string $placeId, int $userId): bool;
}
