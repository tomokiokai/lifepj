<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Google_Client;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);

            return response()->json(['token' => $token, 'user' => $user]);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'ログアウトしました']);
    }

    public function googleLogin(Request $request)
    {
        $googleToken = $request->input('googleToken');

        $clientId = env('GOOGLE_CLIENT_ID');
        $clientSecret =
        env('GOOGLE_CLIENT_SECRET');;

        // Google_Client を設定
        $client = new Google_Client();
        $client->setClientId($clientId);
        $client->setClientSecret($clientSecret);

        $payload = $client->verifyIdToken($googleToken);
        Log::info($payload); // 追加

        if ($payload) {
            // 検索条件でユーザーを探す
            $user = User::where('email', $payload['email'])->first();
            Log::info('User fetched', ['user' => $user]); // ユーザーの取得結果をログ出力

            // ユーザーが見つからなかった場合は新しく作成
            if (!$user) {
                try {
                    $user = User::create([
                        'email' => $payload['email'],
                        'name' => $payload['name'],
                        'password' => Hash::make(Str::random(16))
                    ]);
                } catch (\Exception $e) {
                    // ここで例外をキャッチしてログに記録したり、エラーメッセージをクライアントに返したりします
                    Log::error('Failed to create user', ['error' => $e->getMessage()]);
                    return response()->json(['error' => 'Failed to create user'], 500);
                }
            }

            // JWTトークンを生成します。
            $token = JWTAuth::fromUser($user);
            Log::info('Generated JWT token', ['token' => $token]);

            return response()->json(['token' => $token, 'user' => $user]);
        } else {
            // トークンの検証が失敗した場合の処理
            Log::error('Invalid Google token', ['token' => $googleToken]);
            return response()->json(['error' => 'Invalid Google token'], 401);
        }
    }
}


