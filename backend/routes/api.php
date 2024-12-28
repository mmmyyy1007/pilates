<?php

use App\Http\Controllers\PlaceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

<<<<<<< Updated upstream
Route::post('/place/register', [PlaceController::class, 'register'])->middleware('auth');
=======
Route::middleware(['auth'])->prefix('place')->name('place.')->controller(PlaceController::class)->group(function () {
    Route::middleware(['convert.snake'])->post('register', 'register')->name('register');
    Route::get('show', 'show')->name('show');
});
>>>>>>> Stashed changes
