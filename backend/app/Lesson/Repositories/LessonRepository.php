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
        $sql = Lesson::select('id', 'start_datetime', 'end_datetime', 'place', 'place_id')
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
     * @param string $placeId
     * @return bool $exists
     */
    public function existsLessonById(int $userId, string $placeId): bool
    {
        $sql = Lesson::where('user_id', $userId)->where('place_id', $placeId);
        $exists = $sql->exists();

        return $exists;
    }

    /**
     * @param array $lessonData
     * @return bool $status
     */
    public function registerLesson(array $lessonData): bool
    {
        $status = Lesson::upsert($lessonData, ['id', 'user_id'], ['start_datetime', 'end_datetime', 'place_id', 'place']);

        return $status;
    }
}
