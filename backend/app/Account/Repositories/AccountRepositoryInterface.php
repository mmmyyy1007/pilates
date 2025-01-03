<?php

namespace App\Account\Repositories;

use Illuminate\Database\Eloquent\Collection;
use PHPUnit\TestRunner\TestResult\Collector;

interface AccountRepositoryInterface
{
    /**
     * @param int $userId
     * @return Collection
     */
    public function getAccountById(int $userId): Collection;
}
