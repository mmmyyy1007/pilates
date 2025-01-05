<?php

namespace App\Account\Repositories;

use App\Lesson\Models\Lesson;
use App\Models\User;
use App\Place\Models\Place;
use Illuminate\Database\Eloquent\Collection;
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
     * @param int $userId
     * @param string $key
     * @param string $data
     * @return bool $status
     */
    public function updateUserById(int $userId, string $key, string $data): bool
    {

        $status = User::where('id', $userId)
            ->update([$key => $data]);

        return $status;
    }

    /**
     * @param int $userId
     * @param string $userPassword
     * @param array $data
     * @return bool $status
     */
    public function updatePasswordById(int $userId, string $userPassword, array $data): bool
    {

        // 現在のパスワードと一致するかチェック
        if (Hash::check($data['password'], $userPassword)) {
            return false;
        }

        $status = User::where('id', $userId)
            ->update(['password' => Hash::make($data['new_password'])]);

        return $status;
    }

    /**
     * @param int $userId
     * @return bool $status
     */
    public function deleteUserById(int $userId): bool
    {
        try {

            DB::transaction(
                function () use ($userId) {
                    Lesson::where('user_id', $userId)->delete();
                    Place::where('user_id', $userId)->delete();
                    User::where('id', $userId)->delete();
                }
            );
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
