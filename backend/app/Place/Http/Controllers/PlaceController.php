<?php

namespace App\Place\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaceController extends Controller
{
    protected $placeService;

    public function __construct(PlaceServiceInterface $placeService)
    {
        $this->placeService = $placeService;
    }

    public function show(Request $request)
    {
        $userId = Auth::id();
        $place = $this->placeService->getPlaceById($userId);
        return response()->json(['place' => $place]);
    }

    public function register(Request $request)
    {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }
}
