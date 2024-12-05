<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Models\User;

class TokenValidationController extends Controller
{
    /**
     * パスワードリセットリンクの有効性をチェックする
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function checkToken(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
            'token' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Password::tokenExists($user, $request->token)) {
            return response()->json([
                'message' => trans('passwords.token')
            ], 422);
        }

        return response()->json(['status' => 'valid']);
    }
}
