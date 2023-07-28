<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Shop;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        // ログインユーザーのお気に入りのショップの情報を取得
        $favorites = Favorite::where('user_id', $request->user()->id)->get();
        $shops = Shop::whereIn('id', $favorites->pluck('shop_id'))->get();
        return response()->json(['shops' => $shops]);
    }

    public function store(Request $request)
    {
        // 新たにお気に入りに追加
        $favorite = new Favorite;
        $favorite->user_id = $request->userId; // ここを修正
        $favorite->shop_id = $request->shopId;
        $favorite->save();
        return response()->json(['favorite' => $favorite]);
    }

    public function destroy(Request $request, $shop)
    {
        // お気に入りの削除
        $favorite = Favorite::where('user_id', $request->userId)->where('shop_id', $shop)->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Favorite removed successfully']);
        } else {
            return response()->json(['message' => 'Favorite not found'], 404);
        }
    }
    
    public function check(Request $request, $shop)
    {
        // 指定されたショップがお気に入りに追加されているか確認
        $favorite = Favorite::where('user_id', $request->userId)
            ->where('shop_id', $shop)
            ->first();
        $isFavorite = $favorite != null;
        return response()->json(['isFavorite' => $isFavorite]);
    }

    
}
