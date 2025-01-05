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

    /**
     * ログインパスワード変更
     */
    public function updatePassword(Request $request)
    {
        $userId = Auth::id();
        $userPassword = Auth::user()->password;
        $request->validate([
            'password' => ['required'],
            'new_password' => ['required'],
            'confirm_new_password' => ['required'],
        ]);
        $data = $request->all();

        $status = $this->accountService->updatePasswordById($userId, $userPassword, $data);

        return response()->json(['status' => $status]);
    }

    /**
     * 退会
     */
    public function deleteUser(Request $request)
    {
        $userId = Auth::id();

        $status = $this->accountService->deleteUserById($userId);

        return response()->json(['status' => $status]);
    }
}
