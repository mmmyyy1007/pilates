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
     * @return Collection
     */
    public function findLessonById(int $userId): Collection;

    /**
     * @param array $placeData
     * @return bool
     */
    //public function registerPlace(array $placeData): bool;
}
