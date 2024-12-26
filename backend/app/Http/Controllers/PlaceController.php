<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaceController extends Controller
{
    //
    public function register(Request $request)
    {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }
}
