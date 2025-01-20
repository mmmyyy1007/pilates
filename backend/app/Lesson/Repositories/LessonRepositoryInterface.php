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
     * @param array $lessonData
     * @return bool
     */
    public function registerLesson(array $lessonData): bool;

    /**
     * @param int $userId
     * @return int
     */
    public function countLessonById(int $userId): int;

    /**
     * @param int $userId
     * @param string $id
     * @return bool
     */
    public function existsLessonById(int $userId, string $id): bool;

    /**
     * @param int $userId
     * @param string $placeId
     * @return bool
     */
    public function existsLessonByPlaceId(int $userId, string $placeId): bool;

    /**
     * @param int $userId
     * @return bool
     */
    public function deleteLessonById(int $userId): bool;

    /**
     * @param array $data
     * @return bool
     */
    public function deleteLesson(array $data): bool;
}
