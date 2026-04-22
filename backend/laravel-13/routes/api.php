<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\BlogController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('blogs', BlogController::class)->except(['create', 'edit']);
});

Route::get('users', function (Request $request) {
    return User::all();
});

Route::get('/403', function (Request $request) {
    return response()->json('unauthorized', 403);
});