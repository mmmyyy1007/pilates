<?php

namespace App\Lesson\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Lesson\Services\LessonServiceInterface;
use Illuminate\Http\Request;
use App\Lesson\Http\Requests\RegisterLessonRequest;

class LessonController extends Controller
{
    protected $lessonService;

    public function __construct(LessonServiceInterface $lessonService)
    {
        $this->lessonService = $lessonService;
    }

    /**
     * レッスン登録情報取得
     */
    public function show(Request $request)
    {
        $userId = $request->user()->id;
        $lesson = $this->lessonService->getLessonById($userId);

        return response()->json(['lesson' => $lesson]);
    }

    /**
     * レッスン回数取得
     */
    public function showGuage(Request $request)
    {
        $userId = $request->user()->id;
        $count = $this->lessonService->countLessonById($userId);

        return response()->json(['min' => 0, 'max' => 30, 'count' => $count]);
    }

    /**
     * レッスンタイムライン取得
     */
    public function showTimeline(Request $request)
    {
        $userId = $request->user()->id;
        $timeline = $this->lessonService->timelineLessonById($userId);

        return response()->json(['timeline' => $timeline]);
    }

    /**
     * レッスン情報登録
     */
    public function register(RegisterLessonRequest $request)
    {
        $request->validated();
        $data = $request->only(['place', 'place_id', 'start_datetime', 'end_datetime', 'id']);
        $data['user_id'] = $request->user()->id;

        $status = $this->lessonService->registerLesson($data);

        return response()->json(['status' => $status]);
    }

    /**
     * レッスン削除
     */
    public function deleteLesson(Request $request)
    {
        $data = $request->input();
        $data['user_id'] = $request->user()->id;

        $status = $this->lessonService->deleteLesson($data);

        return response()->json(['status' => $status]);
    }
}
