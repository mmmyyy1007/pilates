<?php

namespace Database\Factories;

use App\Models\User;
use App\Place\Models\Place;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Place\Models\Place>
 */
class PlaceFactory extends Factory
{
    protected $model = Place::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid()->toString(),
            'name' => $this->faker->name,
            'display_flag' => $this->faker->boolean,
            'order_no' => $this->faker->numberBetween(0, 99),
            'user_id' => User::factory(),
        ];
    }
}
