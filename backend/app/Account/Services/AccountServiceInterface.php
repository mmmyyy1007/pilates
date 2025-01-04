<?php

namespace App\Account\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\Rules\In;

interface AccountServiceInterface
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
