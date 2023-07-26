<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date');
            $table->integer('time_slot'); // 1 for 10:00-10:30, 2 for 10:30-11:00, etc.
            $table->integer('adults')->default(0)->nullable();  // <-- make this nullable
            $table->integer('children')->default(0)->nullable();  // <-- make this nullable
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('shop_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_type_adult')->nullable()->constrained('service_types')->onDelete('cascade');
            $table->foreignId('service_type_children')->nullable()->constrained('service_types')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};

