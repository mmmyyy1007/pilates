<?php

namespace App\Account\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class AccountRepository implements AccountRepositoryInterface
{

    /**
     * @param int $userId
     * @return mixed $record
     */
    public function getAccountById(int $userId): mixed
    {
        $sql = User::select('id', 'name', 'email', 'password')
            ->where('id', $userId);

        $record = $sql->first();

        return $record;
    }
}
