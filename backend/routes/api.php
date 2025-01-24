<?php

use App\Account\Http\Controllers\AccountController;
use App\Place\Http\Controllers\PlaceController;
use App\Lesson\Http\Controllers\LessonController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// 店舗一覧
Route::middleware(['auth'])->prefix('place')->name('place.')->controller(PlaceController::class)->group(function () {
    Route::middleware(['convert.snake'])->post('register', 'register')->name('register');
    Route::delete('delete', 'deletePlace')->name('deletePlace');
    Route::get('show', 'show')->name('show');
    Route::get('show/active', 'showActive')->name('showActive');
});

// レッスン一覧
Route::middleware(['auth'])->prefix('lesson')->name('lesson.')->controller(LessonController::class)->group(function () {
    Route::middleware(['convert.snake'])->post('register', 'register')->name('register');
    Route::delete('delete', 'deleteLesson')->name('deleteLesson');
    Route::get('show', 'show')->name('show');
    Route::get('show/guage', 'showGuage')->name('showGuage');
    Route::get('show/timeline', 'showTimeline')->name('showTimeline');
});

// アカウント管理
Route::middleware(['auth'])->prefix('account')->name('account.')->controller(AccountController::class)->group(function () {
    Route::post('update/name', 'updateName')->name('updateName');
    Route::post('update/email', 'updateEmail')->name('updateEmail');
    Route::middleware(['convert.snake'])->post('update/password', 'updatePassword')->name('updatePassword');
    Route::post('delete', 'deleteUser')->name('deleteUser');
    Route::get('show', 'show')->name('show');
});
