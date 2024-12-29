<?php

namespace App\Place\Repositories;

use App\Place\Models\Place;
use Illuminate\Database\Eloquent\Collection;

class PlaceRepository implements PlaceRepositoryInterface
{
    /**
     * @param int $userId
     * @return Collection $records
     */
    public function getPlaceById(int $userId): Collection
    {
        $sql = Place::select('id', 'name', 'display_flag as displayFlag', 'order_no as orderNo')
            ->where('user_id', $userId)
            ->orderBy('order_no');

        $records = $sql->get();

        return $records;
    }

    /**
     * @param array $placeData
     * @return bool $status
     */
    public function registerPlace(array $placeData): bool
    {
        $status = Place::upsert($placeData, ['id', 'user_id'], ['name', 'display_flag', 'order_no']);

        return $status;
    }
}
