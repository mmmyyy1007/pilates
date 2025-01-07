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
    public function show()
    {
        $place = $this->placeService->getPlaceById();
        return response()->json(['place' => $place]);
    }

    /**
     * レッスン場所の取得
     */
    public function showActive()
    {
        $place = $this->placeService->getPlaceActiveById();
        return response()->json(['place' => $place]);
    }

    /**
     * 店舗情報登録
     */
    public function register(Request $request)
    {
        $request->validate([
            '*.name' => ['max:255'],
            '*.display_flag' => ['required'],
            '*.order_no' => ['required'],
        ]);
        $data = $request->all();

        $status = $this->placeService->registerPlace($data);

        return response()->json(['status' => $status]);
    }

    /**
     * 店舗情報削除
     */
    public function deletePlace(Request $request)
    {
        $placeId = $request->input('id');

        $status = $this->placeService->deletePlace($placeId);

        return response()->json(['status' => $status]);
    }
}
