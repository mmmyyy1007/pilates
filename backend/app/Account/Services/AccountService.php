<?php

namespace App\Account\Services;

use App\Account\Repositories\AccountRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class AccountService implements AccountServiceInterface
{
    protected $accountRepository;

    public function __construct(AccountRepositoryInterface $accountRepository)
    {
        $this->accountRepository = $accountRepository;
    }

    /**
     * @param int $userId
     * @return mixed
     */
    public function getAccountById(int $userId): mixed
    {
        $account = $this->accountRepository->getAccountById($userId);

        $start = Carbon::create($account->date);
        $account->date = $start->format('Y.m.d');

        return $account;
    }

    /**
     * @param int $userId
     * @param string $userName
     * @return bool
     */
    public function updateNameById(int $userId, string $userName): bool
    {
        $status = $this->accountRepository->updateNameById($userId, $userName);

        return $status;
    }
}
