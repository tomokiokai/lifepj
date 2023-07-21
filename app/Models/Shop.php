<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'admin_id',
        'area',
        'genre'
    ];

    // Relation to User (Admin)
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    // Relation to Reviews
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // Relation to Reservations
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
