<?php

namespace App\Place\Repositories;

use App\Place\Models\Place;
use App\Lesson\Models\Lesson;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

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
     * @param int $userId
     * @return Collection $records
     */
    public function getActivePlaceById(int $userId): Collection
    {
        $sql = Place::select('id', 'name')
            ->where('user_id', $userId)
            ->where('display_flag', 1)
            ->orderBy('order_no');

        $records = $sql->get();

        return $records;
    }

    /**
     * @param int $userId
     * @param string $placeId
     * @return bool $exists
     */
    public function existsPlaceById(int $userId, string $placeId): bool
    {
        $sql = Place::where('user_id', $userId)->where('id', $placeId);
        $exists = $sql->exists();

        return $exists;
    }

    /**
     * @param array $placeData
     * @return bool
     */
    public function registerPlace(array $placeData): bool
    {
        $status = Place::upsert($placeData, ['id', 'user_id'], ['name', 'display_flag', 'order_no']);

        return $status;
    }

    /**
     * @param string $placeId
     * @param int $userId
     * @return bool
     */
    public function deletePlace(string $placeId, int $userId): bool
    {

        $status = Place::where('user_id', $userId)->where('id', $placeId)->delete();

        return $status;
    }

    /**
     * @param int $userId
     * @return bool
     */
    public function deletePlaceById(int $userId): bool
    {
        $status = Place::where('user_id', $userId)->delete();

        return $status;
    }
}
