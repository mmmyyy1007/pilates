<?php

namespace App\Account\Services;

use App\Account\Repositories\AccountRepositoryInterface;
use App\Lesson\Repositories\LessonRepository;
use App\Place\Repositories\PlaceRepositoryInterface;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AccountService implements AccountServiceInterface
{
    protected $accountRepository;
    protected $placeRepository;
    protected $lessonRepository;

    public function __construct(AccountRepositoryInterface $accountRepository, PlaceRepositoryInterface $placeRepository, LessonRepository $lessonRepository)
    {
        $this->accountRepository = $accountRepository;
        $this->placeRepository = $placeRepository;
        $this->lessonRepository = $lessonRepository;
    }

    /**
     * @param int $userId
     * @return mixed
     */
    public function getAccountById(int $userId): mixed
    {
        $account = $this->accountRepository->getAccountById($userId);

        $start = Carbon::create($account->date);
        $account->date = $start->format('Y.m.d');

        return $account;
    }

    /**
     * @param array $data
     * @return bool
     */
    public function updateUserById(array $data): bool
    {
        $status = $this->accountRepository->updateUserById($data);

        return $status;
    }

    /**
     * @param array $data
     * @return bool
     */
    public function updatePasswordById(array $data): bool
    {
        // 現在のパスワードと一致するかチェック
        if (Hash::check($data['password'], $data['user_password'])) {
            return false;
        }

        $status = $this->accountRepository->updatePasswordById($data);

        return $status;
    }

    /**
     * @param int $userId
     * @return bool
     */
    public function deleteUserById(int $userId): bool
    {
        try {
            DB::transaction(
                function () use ($userId) {
                    $this->lessonRepository->deleteLessonById($userId);
                    $this->placeRepository->deletePlaceById($userId);
                    $this->accountRepository->deleteUserById($userId);
                }
            );
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
