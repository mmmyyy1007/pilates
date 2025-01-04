<?php

namespace App\Account\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class AccountRepository implements AccountRepositoryInterface
{

    /**
     * @param int $userId
     * @return mixed $record
     */
    public function getAccountById(int $userId): mixed
    {
        $sql = User::select('users.id', 'users.name', 'email', DB::raw("CASE WHEN lessons.start_datetime IS NULL THEN users.created_at ELSE lessons.start_datetime END as date"))
            ->leftJoin('lessons', 'users.id', '=', 'lessons.user_id')
            ->where('users.id', $userId)
            ->orderBy('lessons.start_datetime');

        $record = $sql->first();

        return $record;
    }

    /**
     * @param int $userId
     * @param string $userName
     * @return bool $status
     */
    public function updateNameById(int $userId, string $userName): bool
    {
        $status = User::where('id', $userId)
            ->update(['name' => $userName]);

        return $status;
    }
}
