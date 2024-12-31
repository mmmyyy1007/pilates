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
     *
     */
    public function showGuage(Request $request)
    {
        $userId = Auth::id();
        $count = $this->lessonService->countLessonById($userId);
        return response()->json(['count' => $count]);
    }

    /**
     * レッスン登録情報取得(1件)
     */
    public function find(Request $request)
    {
        $userId = Auth::id();
        $lesson = $this->lessonService->findLessonById($userId);
        return response()->json($lesson);
    }
}
