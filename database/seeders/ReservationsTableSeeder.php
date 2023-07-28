<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Faker\Factory as Faker;

class ReservationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get the ids for user, shop, service_type_adult, and service_type_children
        $userIds = DB::table('users')->pluck('id')->toArray();
        $shopIds = DB::table('shops')->pluck('id')->toArray();
        $serviceTypeAdultIds = DB::table('service_types')->pluck('id')->toArray();
        $serviceTypeChildrenIds = DB::table('service_types')->pluck('id')->toArray();

        $reservations = [];
        $faker = Faker::create();
        $today = Carbon::today();

        while (count($reservations) < 100) {
            $date = $today->copy()->addDays($faker->numberBetween(0, 30));
            $timeSlot = $faker->numberBetween(0, 21); // considering a time slot every 30 minutes between 10:00 and 21:00

            $hours = intdiv($timeSlot, 2) + 10;
            $minutes = $timeSlot % 2 == 0 ? 0 : 30;
            $date->setTime($hours, $minutes);
            $timeSlot = ($hours - 10) * 2 + ($minutes >= 30 ? 1 : 0);
            $adults = $faker->numberBetween(0, 5);
            $children = $faker->numberBetween(0, 5);
            $userId = $userIds[array_rand($userIds)];
            $shopId = $shopIds[array_rand($shopIds)];
            $serviceTypeAdultId = $serviceTypeAdultIds[array_rand($serviceTypeAdultIds)];
            $serviceTypeChildrenId = $serviceTypeChildrenIds[array_rand($serviceTypeChildrenIds)];

            // Check if the reservation for the same date, time slot and shop already exists
            $exists = DB::table('reservations')
                ->where('date', '=', $date->toDateTimeString())
                ->where('time_slot', '=', $timeSlot)
                ->where('shop_id', '=', $shopId)
                ->exists();

            if (!$exists) {
                $reservations[] = [
                    'date' => $date->toDateTimeString(),
                    'time_slot' => $timeSlot,
                    'adults' => $adults,
                    'children' => $children,
                    'user_id' => $userId,
                    'shop_id' => $shopId,
                    'service_type_adult' => $serviceTypeAdultId,
                    'service_type_children' => $serviceTypeChildrenId,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }
        }

        // Insert the reservations into the database
        DB::table('reservations')->insert($reservations);
    }
}
