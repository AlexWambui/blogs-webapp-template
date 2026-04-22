<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\BlogController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/blogs', [BlogController::class, 'index']);
    Route::post('/blogs', [BlogController::class, 'store']);
    Route::get('/blogs/{blog:slug}', [BlogController::class, 'show']);
    Route::put('/blogs/{blog:slug}', [BlogController::class, 'update']);
    Route::patch('/blogs/{blog:slug}', [BlogController::class, 'update']);
    Route::delete('/blogs/{blog:slug}', [BlogController::class, 'destroy']);
});

Route::get('users', function () {
    return User::all();
});

Route::get('/403', function () {
    return response()->json('unauthorized', 403);
});