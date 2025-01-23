<?php

namespace App\Account\Repositories;

interface AccountRepositoryInterface
{
    /**
     * @param int $userId
     * @return mixed
     */
    public function getAccountById(int $userId): mixed;

    /**
     * @param array $data
     * @return bool
     */
    public function updateUserById(array $data): bool;

    /**
     * @param array $data
     * @return bool
     */
    public function updatePasswordById(array $data): bool;

    /**
     * @param int $userId
     * @return bool
     */
    public function deleteUserById(int $userId): bool;
}
