<?php

namespace App\Lesson\Services;

use App\Lesson\Repositories\LessonRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

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

            $events['title'] = $item['place'] . '(' . $diff . '分)';
            $events['start'] = $start->format('Y-m-d\TH:i:s');
            $events['end'] = $end->format('Y-m-d\TH:i:s');
            return $events;
        })->toArray();

        return $events;
    }

    /**
     * @param int $userId
     * @return int
     */
    public function countLessonById(int $userId): int
    {
        $count = $this->lessonRepository->countLessonById($userId);

        return $count;
    }

    /**
     * @param int $userId
     * @return array
     */
    public function timelineLessonById($userId): array
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
     * @param int $userId
     * @return Collection
     */
    public function findLessonById(int $userId): Collection
    {
        $lesson = $this->lessonRepository->findLessonById($userId);

        return $lesson;
    }

    /**
     * @param array $placeData
     * @return bool
     */
    // public function registerPlace(array $placeData): bool
    // {
    //     // 新規の場合、ユニークIDを再設定
    //     $placeData = collect($placeData)->map(function ($item) {
    //         if (strlen($item['id']) !== 36) {
    //             $item['id'] = Str::uuid();
    //         }
    //         return $item;
    //     })->toArray();

    //     // 店舗情報登録
    //     $status = $this->placeRepository->registerPlace($placeData);

    //     return $status;
    // }
}
