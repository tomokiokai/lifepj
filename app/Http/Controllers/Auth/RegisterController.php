<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Mail\VerificationCodeMailable;
use Illuminate\Support\Facades\Mail;

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
            'verification_code' => Str::random(16), // ランダムな16文字のコード
            'is_verified' => false,
        ]);
        // メールを送信
        Mail::to($email)->send(new VerificationCodeMailable($user->verification_code));

        // 登録に成功した場合は新しいユーザーを返す
        return $user;
    }
}

