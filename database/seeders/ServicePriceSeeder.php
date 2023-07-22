<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceType;
use App\Models\ServicePrice;

class ServicePriceSeeder extends Seeder
{
    public function run()
    {
        $prices = [
            'カット' => ['adult_price' => 4000, 'children_price' => 2000],
            'パーマ' => ['adult_price' => 5000, 'children_price' => 2000],
            'カラー' => ['adult_price' => 6000, 'children_price' => 3000],
            'ヘッドスパ' => ['adult_price' => 3000, 'children_price' => 1000],
        ];

        foreach ($prices as $name => $price) {
            $serviceType = ServiceType::where('name', $name)->first();
            if ($serviceType) {
                ServicePrice::create([
                    'service_type_id' => $serviceType->id,
                    'adult_price' => $price['adult_price'],
                    'children_price' => $price['children_price']
                ]);
            }
        }
    }
}
