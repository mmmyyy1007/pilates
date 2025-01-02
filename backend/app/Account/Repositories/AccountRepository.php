<?php

namespace App\Account\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class AccountRepository implements AccountRepositoryInterface
{

    /**
     * @param int $userId
     * @return Collection $records
     */
    public function getAccountById(int $userId): Collection
    {
        $sql = User::select('id', 'name', 'email', 'password')
            ->where('id', $userId);

        $records = $sql->get();

        return $records;
    }
}
