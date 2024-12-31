<?php

namespace App\Lesson\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\Rules\In;

interface LessonServiceInterface
{
    /**
     * @param int $userId
     * @return array
     */
    public function getLessonById(int $userId): array;

    /**
     * @param int $userId
     * @return int
     */
    public function countLessonById(int $userId): int;

    /**
     * @param int $userId
     * @return array
     */
    public function timelineLessonById(int $userId): array;


    /**
     * @param int $userId
     * @param string $id
     * @return Collection
     */
    public function getLessonDetailById(int $userId, string $id): Collection;

    /**
     * @param array $placeData
     * @return bool
     */
    //public function registerPlace(array $placeData): bool;
}
