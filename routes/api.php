<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ServiceTypeController;
use App\Http\Controllers\ServicePriceController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\FavoriteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/google-login', [AuthController::class, 'googleLogin']);
Route::get('/users', [AuthController::class, 'getUsers']);
Route::get('/shops', [ShopController::class, 'index']);
Route::get('/service_types', [ServiceTypeController::class, 'index']);
Route::get('/service_prices', [ServicePriceController::class, 'index']);
Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/user_reservations', [ReservationController::class, 'userReservations'])->middleware('auth:api');

Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/favorites', [FavoriteController::class, 'index']);
Route::post('/favorites', [FavoriteController::class, 'store']);
Route::get('/user_favorites', [FavoriteController::class, 'userFavorites'])->middleware('auth:api');;
Route::delete('/favorites/{shop}', [FavoriteController::class, 'destroy']);
Route::get('/favorites/{shop}', [FavoriteController::class, 'check']);

