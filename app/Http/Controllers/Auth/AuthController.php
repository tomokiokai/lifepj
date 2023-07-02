<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            return response()->json(['user' => $user]);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'ログアウトしました']);
    }
}
