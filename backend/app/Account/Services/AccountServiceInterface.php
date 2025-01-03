<?php

namespace App\Account\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\Rules\In;

interface AccountServiceInterface
{
    /**
     * @param int $userId
     * @return Collection
     */
    public function getAccountById(int $userId): Collection;
}
