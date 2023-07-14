<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create 10 users with role 1
        for ($i = 1; $i <= 10; $i++) {
            DB::table('users')->insert([
                'name' => 'user' . $i,
                'email' => 'user' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'is_verified' => true,
            ]);
        }

        // Create 5 admins with role 2
        for ($i = 1; $i <= 5; $i++) {
            DB::table('users')->insert([
                'name' => 'admin' . $i,
                'email' => 'admin' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role' => 2,
                'is_verified' => true,
            ]);
        }

        // Create 1 owner with role 3
        DB::table('users')->insert([
            'name' => 'owner1',
            'email' => 'owner1@example.com',
            'password' => Hash::make('password'),
            'role' => 3,
            'is_verified' => true,
        ]);
    }
}