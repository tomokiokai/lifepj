<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;  // Service モデルをインポートします

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();  // すべてのサービスを取得します
        return response()->json(['services' => $services]);  // JSON形式でサービスを返します
    }
}
