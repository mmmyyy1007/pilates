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
