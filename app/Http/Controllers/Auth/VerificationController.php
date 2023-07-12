<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify(Request $request)
    {
        $code = $request->input('code');

        // 指定されたコードを持つユーザーを探す
        $user = User::where('verification_code', $code)->first();

        // ユーザーが見つかった場合、認証フラグを更新する
        if ($user) {
            $user->is_verified = true;
            $user->verification_code = null;  // 認証後は、認証コードをクリアする
            $user->save();

            // ユーザーが見つかった場合、あるいは他の処理を実行する
            // 例えば、ログインページにリダイレクトする、あるいはメッセージを表示するなど

            return redirect('/')->with('status', 'Your email address is verified!');
        } else {
            // ユーザーが見つからない場合、エラーメッセージを表示する

            return redirect('/')->with('error', 'Invalid verification code.');
        }
    }
}
