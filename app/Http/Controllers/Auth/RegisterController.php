<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // 入力データのバリデーションなどを行わずに直接データを取得する
        $username = $request->input('username');
        $password = $request->input('password');
        $email = $request->input('email');

        // 新しいユーザーを作成して保存する
        $user = User::create([
            'name' => $username,
            'password' => bcrypt($password),
            'email' => $email,
        ]);

        // 登録に成功した場合は新しいユーザーを返す
        return $user;
    }
}

