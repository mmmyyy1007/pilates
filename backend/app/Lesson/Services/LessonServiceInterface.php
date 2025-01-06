<?php

namespace App\Lesson\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\Rules\In;

interface LessonServiceInterface
{
    /**
     * @return array
     */
    public function getLessonById(): array;

    /**
     * @return int
     */
    public function countLessonById(): int;

    /**
     * @return array
     */
    public function timelineLessonById(): array;

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
