<?php

namespace App\Place\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Place\Services\PlaceServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaceController extends Controller
{
    protected $placeService;

    public function __construct(PlaceServiceInterface $placeService)
    {
        $this->placeService = $placeService;
    }

    /**
     * 店舗情報取得
     */
    public function show(Request $request)
    {
        $userId = Auth::id();
        $place = $this->placeService->getPlaceById($userId);
        return response()->json(['place' => $place]);
    }

    /**
     * 店舗情報登録
     */
    public function register(Request $request)
    {
        $request->validate([
            '*.name' => ['required', 'max:255'],
            '*.display_flag' => ['required'],
            '*.order_no' => ['required'],
        ]);
        $data = $request->all();

        $placeData = collect($data)->map(function ($item) {
            $item['user_id'] = Auth::id();
            return $item;
        })->toArray();

        $status = $this->placeService->registerPlace($placeData);

        return response()->json(['status' => $status]);
    }
}
