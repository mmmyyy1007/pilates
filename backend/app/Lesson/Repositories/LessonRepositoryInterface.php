<?php

namespace App\Lesson\Repositories;

use Illuminate\Database\Eloquent\Collection;
use PHPUnit\TestRunner\TestResult\Collector;

interface LessonRepositoryInterface
{
    /**
     * @param int $userId
     * @return Collection
     */
    public function getLessonById(int $userId): Collection;

    /**
     * @param int $userId
     * @return int
     */
    public function countLessonById(int $userId): int;



    /**
     * @param int $userId
     * @return Collection
     */
    public function findLessonById(int $userId): Collection;

    /**
     * @param array $placeData
     * @return bool
     */
    // public function registerPlace(array $placeData): bool;
}
