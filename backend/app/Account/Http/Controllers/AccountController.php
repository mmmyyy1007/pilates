<?php

namespace App\Account\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Account\Services\AccountServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    protected $accountService;

    public function __construct(AccountServiceInterface $accountService)
    {
        $this->accountService = $accountService;
    }

    /**
     * ログインユーザー登録情報取得
     */
    public function show(Request $request)
    {
        $userId = Auth::id();
        $account = $this->accountService->getAccountById($userId);

        return response()->json(['account' => $account]);
    }

    /**
     * ログインユーザー変更
     */
    public function updateUser(Request $request)
    {
        $userId = Auth::id();
        $key = $request->input('key');
        $data = $request->input('data');

        $status = $this->accountService->updateUserById($userId, $key, $data);

        return response()->json(['status' => $status]);
    }
}
