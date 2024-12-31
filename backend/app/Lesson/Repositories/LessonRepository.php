<?php

namespace App\Lesson\Repositories;

use App\Place\Models\Place;
use App\Lesson\Models\Lesson;
use Illuminate\Database\Eloquent\Collection;

class LessonRepository implements LessonRepositoryInterface
{

    /**
     * @param int $userId
     * @return Collection $records
     */
    public function getLessonById(int $userId): Collection
    {
        $sql = Lesson::select('id', 'start_datetime', 'end_datetime', 'place')
            ->where('user_id', $userId)
            ->orderBy('start_datetime')
            ->orderBy('end_datetime');

        $records = $sql->get();

        return $records;
    }

    /**
     * @param int $userId
     * @return int $count
     */
    public function countLessonById(int $userId): int
    {
        $sql = Lesson::where('user_id', $userId);

        $count = $sql->count();

        return $count;
    }


    /**
     * @param int $userId
     * @return Collection $record
     */
    public function findLessonById(int $userId): Collection
    {
        $sql = Lesson::select('id', 'start_datetime as startDatetime', 'end_datetime as endDatetime', 'place')
            ->where('user_id', $userId)
            ->orderBy('start_datetime');

        $record = $sql->first();

        return $record;
    }

    /**
     * @param array $placeData
     * @return bool $status
     */
    // public function registerPlace(array $placeData): bool
    // {
    //     $status = Place::upsert($placeData, ['id', 'user_id'], ['name', 'display_flag', 'order_no']);

    //     return $status;
    // }
}
