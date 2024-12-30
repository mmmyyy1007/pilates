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
     * レッスン登録情報取得
     */
    public function show(Request $request)
    {
        $userId = Auth::id();
        $place = $this->lessonService->getPlaceById($userId);
        return response()->json(['place' => $place]);
    }
}
