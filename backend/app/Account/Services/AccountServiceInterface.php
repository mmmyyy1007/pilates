<?php

namespace App\Account\Services;

interface AccountServiceInterface
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
    public function updateNameById(array $data): bool;

    /**
     * @param array $data
     * @return bool
     */
    public function updateEmailById(array $data): bool;

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
