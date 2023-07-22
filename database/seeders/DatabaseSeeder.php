<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UsersTableSeeder;
use Database\Seeders\ShopsTableSeeder;
use Database\Seeders\ServiceTypeSeeder;
use Database\Seeders\ServicePriceSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            ShopsTableSeeder::class,
            ServiceTypeSeeder::class,
            ServicePriceSeeder::class,
        ]);
    }
}
