<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Shop;
use Faker\Factory as Faker;

class ShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {
            Shop::create([
                'name' => $faker->company,
                'address' => $faker->address,
                'area' => $faker->city,
                'genre' => $faker->randomElement(['Genre 1', 'Genre 2', 'Genre 3']),
            ]);
        }
    }
}

