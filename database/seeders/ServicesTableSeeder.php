<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Service::create([
            'name' => 'カット',
            'price' => 4000,
        ]);

        Service::create([
            'name' => 'パーマ',
            'price' => 8000,
        ]);

        Service::create([
            'name' => 'カラー',
            'price' => 10000,
        ]);

        Service::create([
            'name' => 'ヘッドスパ',
            'price' => 5000,
        ]);

    }
}
