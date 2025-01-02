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
}
