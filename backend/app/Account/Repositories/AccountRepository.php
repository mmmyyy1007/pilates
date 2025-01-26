<?php

namespace App\Account\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
     * @param array $data
     * @return bool $status
     */
    public function updateNameById(array $data): bool
    {
        $status = User::where('id', $data['user_id'])
            ->update(['name' => $data['value']]);

        return $status;
    }

    /**
     * @param array $data
     * @return bool $status
     */
    public function updateEmailById(array $data): bool
    {
        $status = User::where('id', $data['user_id'])
            ->update(['email' => $data['value']]);

        return $status;
    }

    /**
     * @param array $data
     * @return bool $status
     */
    public function updatePasswordById(array $data): bool
    {

        $status = User::where('id', $data['user_id'])
            ->update(['password' => Hash::make($data['new_password'])]);

        return $status;
    }

    /**
     * @param int $userId
     * @return bool $status
     */
    public function deleteUserById(int $userId): bool
    {
        $status = User::where('id', $userId)->delete();

        return $status;
    }
}
