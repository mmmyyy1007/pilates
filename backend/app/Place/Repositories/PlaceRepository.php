<?php

namespace App\Place\Repositories;

use App\Place\Models\Place;
use Illuminate\Database\Eloquent\Collection;

class PlaceRepository implements PlaceRepositoryInterface
{
    /**
     * @param int $userId
     * @return Collection
     */
    public function getPlaceById(int $userId): Collection
    {
        return Place::select('id', 'name', 'display_flag as displayFlag', 'order_no as orderNo')->where('user_id', $userId)->get();
    }

    /**
     * @param array $placeData
     * @return bool
     */
    public function registerPlace(array $placeData): bool
    {
        return Place::upsert($placeData, ['id', 'user_id'], ['name', 'display_flag', 'order_no']);
    }
}
