<?php

namespace App\Place\Repositories;

use App\Place\Models\Place;

interface PlaceRepositoryInterface
{
    /**
     * @param int $userId
     * @return Place
     */
    public function getPlaceById(int $userId): Place;
}
