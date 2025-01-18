<?php

namespace App\Place\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Place\Services\PlaceServiceInterface;
use Illuminate\Http\Request;
use App\Place\Http\Requests\RegisterPlaceRequest;

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
        $userId = $request->user()->id;
        $place = $this->placeService->getPlaceById($userId);
        return response()->json(['place' => $place]);
    }

    /**
     * レッスン場所の取得
     */
    public function showActive(Request $request)
    {
        $userId = $request->user()->id;
        $place = $this->placeService->getActivePlaceById($userId);
        return response()->json(['place' => $place]);
    }

    /**
     * 店舗情報登録
     */
    public function register(RegisterPlaceRequest $request)
    {
        $data = $request->validated();
        $userId = $request->user()->id;

        $data = collect($data)->map(function ($item) use ($userId) {
            $item['user_id'] = $userId;
            return $item;
        })->toArray();

        $status = $this->placeService->registerPlace($data);

        return response()->json(['status' => $status]);
    }

    /**
     * 店舗情報削除
     */
    public function deletePlace(Request $request)
    {

        $placeId = $request->input('id');
        $userId = $request->user()->id;

        $status = $this->placeService->deletePlace($placeId, $userId);

        return response()->json(['status' => $status]);
    }
}
