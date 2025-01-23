<?php

namespace App\Account\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Account\Services\AccountServiceInterface;
use Illuminate\Http\Request;

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
        $userId = $request->user()->id;
        $account = $this->accountService->getAccountById($userId);

        return response()->json(['account' => $account]);
    }

    /**
     * ログインユーザー変更
     */
    public function updateUser(Request $request)
    {
        $data = $request->input();
        $data['user_id'] = $request->user()->id;

        $status = $this->accountService->updateUserById($data);

        return response()->json(['status' => $status]);
    }

    /**
     * ログインパスワード変更
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => ['required'],
            'new_password' => ['required'],
            'confirm_new_password' => ['required'],
        ]);
        $data = $request->input();
        $data['user_id'] = $request->user()->id;
        $data['user_password'] = $request->user()->password;

        $status = $this->accountService->updatePasswordById($data);

        return response()->json(['status' => $status]);
    }

    /**
     * 退会
     */
    public function deleteUser(Request $request)
    {
        $userId = $request->user()->id;
        $status = $this->accountService->deleteUserById($userId);

        return response()->json(['status' => $status]);
    }
}
