<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Shop;

class ShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Shop::create([
            'name' => 'First Shop',
            'address' => '123 First Street',
            'area' => 'First Area',
            'genre' => 'First Genre',
        ]);

        Shop::create([
            'name' => 'Second Shop',
            'address' => '456 Second Street',
            'area' => 'Second Area',
            'genre' => 'Second Genre',
        ]);

        // Repeat for as many shops as you need...
    }
}
