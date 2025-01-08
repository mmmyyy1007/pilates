<?php

namespace App\Lesson\Services;

use App\Lesson\Repositories\LessonRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class LessonService implements LessonServiceInterface
{
    protected $lessonRepository;

    public function __construct(LessonRepositoryInterface $lessonRepository)
    {
        $this->lessonRepository = $lessonRepository;
    }

    /**
     * @param int $userId
     * @return array
     */
    public function getLessonById(int $userId): array
    {
        $lesson = $this->lessonRepository->getLessonById($userId);

        $events = collect($lesson)->map(function ($item) {
            $start = Carbon::create($item['start_datetime']);
            $end = Carbon::create($item['end_datetime']);
            $diff = $start->diffInMinutes($end);

            $events['id'] = $item['id'];
            $events['title'] = $item['place'] . '(' . $diff . '分)';
            $events['start'] = $start->format('Y-m-d\TH:i:s');
            $events['end'] = $end->format('Y-m-d\TH:i:s');
            $events['place'] = $item['place'];
            $events['placeId'] = $item['place_id'];
            return $events;
        })->toArray();

        return $events;
    }

    /**
     * @param int $userId
     * @return int
     */
    public function countLessonById($userId): int
    {
        $count = $this->lessonRepository->countLessonById($userId);

        return $count;
    }

    /**
     * @param int $userId
     * @return array
     */
    public function timelineLessonById(int $userId): array
    {
        $lesson = $this->lessonRepository->getLessonById($userId);

        $timeline = collect($lesson)->map(function ($item, $index) {
            $start = Carbon::create($item['start_datetime']);
            $end = Carbon::create($item['end_datetime']);

            $timeline['id'] = $item['id'];
            $timeline['count'] = $index + 1;
            $timeline['date'] = $start->format('Y.m.d');
            $timeline['start'] = $start->format('H:i');
            $timeline['end'] = $end->format('H:i');
            $timeline['place'] = $item['place'];
            return $timeline;
        })->toArray();

        return $timeline;
    }

    /**
     * @param array $lessonData
     * @return bool
     */
    public function registerLesson(array $lessonData): bool
    {
        // 新規の場合、ユニークIDを再設定
        $exists = $this->lessonRepository->existsLessonById($lessonData['user_id'], $lessonData['id']);

        if (!$exists) {
            $lessonData['id'] = Str::uuid();
        }

        // レッスン情報登録
        $status = $this->lessonRepository->registerLesson($lessonData);

        return $status;
    }

    /**
     * @param array $data
     * @return bool
     */
    public function deleteLesson(array $data): bool
    {
        $status = $this->lessonRepository->deleteLesson($data);

        return $status;
    }
}
