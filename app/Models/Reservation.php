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
        'service_type_adult',
        'service_type_children',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function serviceTypeAdult()
    {
        return $this->belongsTo(ServiceType::class, 'service_type_adult');
    }

    public function serviceTypeChildren()
    {
        return $this->belongsTo(ServiceType::class, 'service_type_children');
    }
}

