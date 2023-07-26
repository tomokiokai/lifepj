<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();
        return response()->json(['reservations' => $reservations], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time_slot' => 'required|integer',
            'adults' => 'required|integer',
            'children' => 'required|integer',
            'user_id' => 'required|integer',
            'service_type_adult' => 'required|integer',
            'service_type_children' => 'required|integer',
            'shop_id' => 'required|integer',
        ]);

        $reservation = new Reservation;
        $reservation->date = $request->date;
        $reservation->time_slot = $request->time_slot;
        $reservation->adults = $request->adults;
        $reservation->children = $request->children;
        $reservation->user_id = $request->user_id;
        $reservation->service_type_adult = $request->service_type_adult;
        $reservation->service_type_children = $request->service_type_children;
        $reservation->shop_id = $request->shop_id;

        $reservation->save();

        return response()->json(['message' => 'Reservation created successfully.'], 200);
    }
}
