<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceType extends Model
{
    use HasFactory;

    public function servicePrices()
    {
        return $this->hasMany(ServicePrice::class);
    }

    public function adultReservations()
    {
        return $this->belongsToMany(Reservation::class, 'adult_reservations_service_types');
    }

    public function childrenReservations()
    {
        return $this->belongsToMany(Reservation::class, 'children_reservations_service_types');
    }
}
