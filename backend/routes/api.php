<?php

use App\Place\Http\Controllers\PlaceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth'])->prefix('place')->name('place.')->controller(PlaceController::class)->group(function () {
    Route::post('register', 'register')->name('register');
    Route::post('show', 'show')->name('show');
});
