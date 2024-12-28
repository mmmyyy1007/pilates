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
     * @param array $placeData
     * @return bool
     */
    public function registerPlace(array $placeData): bool;
}
