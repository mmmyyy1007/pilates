<?php

namespace App\Place\Services;

use Illuminate\Database\Eloquent\Collection;

interface PlaceServiceInterface
{

    /**
     * @return Collection
     */
    public function getPlaceById(): Collection;

    /**
     * @return Collection
     */
    public function getPlaceActiveById(): Collection;

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
