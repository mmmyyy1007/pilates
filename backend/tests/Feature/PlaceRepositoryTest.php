<?php

namespace Tests\Feature;

use App\Place\Models\Place;
use App\Place\Repositories\PlaceRepositoryInterface;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PlaceRepositoryTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    protected PlaceRepositoryInterface $placeRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->placeRepository = app(PlaceRepositoryInterface::class);
    }

    public function test_registerPlace()
    {
        $data = [
            'id' => $this->faker->uuid,
            'name' => $this->faker->name,
            'display_flag' => $this->faker->boolean,
            'order_no' => $this->faker->numberBetween(0, 99),
            'user_id' => $this->faker->numberBetween(1, 99),
        ];

        $result = $this->placeRepository->registerPlace($data);

        $this->assertTrue($result);
        $this->assertDatabaseHas('places', ['id' => $data['id'], 'user_id' => $data['user_id']]);
    }
}
