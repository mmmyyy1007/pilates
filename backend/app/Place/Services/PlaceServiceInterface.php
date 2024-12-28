<?php

namespace App\Place\Services;

interface PlaceServiceInterface
{
    /**
     * @param int $userId
     * @return array
     */
    public function getPlaceById(int $userId): array;
}
