<?php
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
