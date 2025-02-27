<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClothingController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Categories
    Route::apiResource('categories', CategoryController::class);
    
    // Clothing items
    Route::apiResource('clothings', ClothingController::class);
    
    // Optional fallback for undefined routes
    Route::fallback(function(){
        return response()->json(['message' => 'Not Found.'], 404);
    });
});
