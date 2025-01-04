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
    public function updateName(Request $request)
    {
        $userId = Auth::id();
        $data = $request->all();
        $userName = $request->input('name');
        $status = $this->accountService->updateNameById($userId, $userName);

        return response()->json(['status' => $status]);
    }
}
