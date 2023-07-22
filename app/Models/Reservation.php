<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'time',
        'adults',
        'children',
        'user_id',
        'shop_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function adultServiceTypes()
    {
        return $this->belongsToMany(ServiceType::class, 'adult_reservations_service_types');
    }

    public function childrenServiceTypes()
    {
        return $this->belongsToMany(ServiceType::class, 'children_reservations_service_types');
    }
}


