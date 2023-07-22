<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceType;

class ServiceTypeSeeder extends Seeder
{
    public function run()
    {
        $services = ['カット', 'パーマ', 'カラー', 'ヘッドスパ'];

        foreach ($services as $service) {
            ServiceType::create(['name' => $service]);
        }
    }
}