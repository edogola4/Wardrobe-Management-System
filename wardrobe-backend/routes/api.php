<?php
/*
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ClothingController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/clothing', [ClothingController::class, 'index']);
    Route::post('/clothing', [ClothingController::class, 'store']);
    Route::get('/clothing/{id}', [ClothingController::class, 'show']);
    Route::put('/clothing/{id}', [ClothingController::class, 'update']);
    Route::delete('/clothing/{id}', [ClothingController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
*/
// routes/api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClothingItemController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);
    
    // Clothing items
    Route::get('/clothing-items', [ClothingItemController::class, 'index']);
    Route::post('/clothing-items', [ClothingItemController::class, 'store']);
    Route::get('/clothing-items/{clothingItem}', [ClothingItemController::class, 'show']);
    Route::put('/clothing-items/{clothingItem}', [ClothingItemController::class, 'update']);
    Route::delete('/clothing-items/{clothingItem}', [ClothingItemController::class, 'destroy']);
    Route::patch('/clothing-items/{clothingItem}/toggle-favorite', [ClothingItemController::class, 'toggleFavorite']);
});