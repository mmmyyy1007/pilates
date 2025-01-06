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
     * @param string $id
     * @return Collection
     */
    public function getLessonDetailById(int $userId, string $id): Collection;

    /**
     * @param array $lessonData
     * @return bool
     */
    public function registerLesson(array $lessonData): bool;
}
