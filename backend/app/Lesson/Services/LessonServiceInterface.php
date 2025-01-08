<?php

namespace App\Lesson\Services;

interface LessonServiceInterface
{
    /**
     * @param int $userId
     * @return array
     */
    public function getLessonById(int $userId): array;

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
     * @return array
     */
    public function timelineLessonById(int $userId): array;

    /**
     * @param array $data
     * @return bool
     */
    public function deleteLesson(array $data): bool;
}
