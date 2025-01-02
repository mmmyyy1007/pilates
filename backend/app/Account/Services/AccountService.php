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
     * @return Collection
     */
    public function getAccountById(int $userId): Collection
    {
        $account = $this->accountRepository->getAccountById($userId);

        return $account;
    }
}
