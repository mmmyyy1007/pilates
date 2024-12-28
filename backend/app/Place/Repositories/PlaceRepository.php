<?php

namespace App\Place\Repositories;

use App\Place\Models\Place;

class PlaceRepository implements PlaceRepositoryInterface
{
    /**
     * @param int $userId
     * @return Place
     */
    public function getPlaceById(int $userId): Place
    {
        return Place::find($userId);
    }
}
