<?php

namespace App\Lesson\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Lesson\Services\LessonServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LessonController extends Controller
{
    protected $lessonService;

    public function __construct(LessonServiceInterface $lessonService)
    {
        $this->lessonService = $lessonService;
    }

    /**
     * レッスン登録情報取得(全件)
     */
    public function show(Request $request)
    {
        $userId = Auth::id();
        $lesson = $this->lessonService->getLessonById($userId);
        return response()->json(['lesson' => $lesson]);
    }

    /**
     * レッスン回数取得
     */
    public function showGuage()
    {
        $count = $this->lessonService->countLessonById();
        return response()->json(['min' => 0, 'max' => 30, 'count' => $count]);
    }

    /**
     * レッスンタイムライン取得
     */
    public function showTimeline()
    {
        $timeline = $this->lessonService->timelineLessonById();
        return response()->json(['timeline' => $timeline]);
    }

    /**
     * レッスン登録情報取得(詳細)
     */
    public function showDetail(Request $request)
    {
        $userId = Auth::id();
        $id = $request->input('id');
        $lesson = $this->lessonService->getLessonDetailById($userId, $id);
        return response()->json(['lesson' => $lesson]);
    }

    /**
     * レッスン情報登録
     */
    public function register(Request $request)
    {
        // $request->validate([
        //     '*.name' => ['required', 'max:255'],
        //     '*.display_flag' => ['required'],
        //     '*.order_no' => ['required'],
        // ]);
        $lessonData = $request->all();
        $lessonData += ['user_id' => Auth::id()];

        $status = $this->lessonService->registerLesson($lessonData);

        return response()->json(['status' => $status]);
    }
}
