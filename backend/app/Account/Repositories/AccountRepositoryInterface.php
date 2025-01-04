<?php

namespace App\Account\Repositories;

use Illuminate\Database\Eloquent\Collection;
use PHPUnit\TestRunner\TestResult\Collector;

interface AccountRepositoryInterface
{
    /**
     * @param int $userId
     * @return mixed
     */
    public function getAccountById(int $userId): mixed;

    /**
     * @param int $userId
     * @param string $key
     * @param string $data
     * @return bool
     */
    public function updateUserById(int $userId, string $key, string $data): bool;
}
