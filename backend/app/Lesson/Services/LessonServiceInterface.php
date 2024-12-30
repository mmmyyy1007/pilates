<?php

namespace App\Lesson\Services;

use Illuminate\Database\Eloquent\Collection;

interface LessonServiceInterface
{
    /**
     * @param int $userId
     * @return Collection
     */
    public function getPlaceById(int $userId): Collection;

    /**
     * @param array $placeData
     * @return bool
     */
    //public function registerPlace(array $placeData): bool;
}
