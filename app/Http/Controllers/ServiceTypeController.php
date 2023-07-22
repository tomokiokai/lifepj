<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceType;

class ServiceTypeController extends Controller
{
    public function index()
    {
        return response()->json([
            'service_types' => ServiceType::all(),
        ]);
    }
}
