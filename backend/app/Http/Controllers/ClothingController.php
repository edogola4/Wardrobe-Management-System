<?php

namespace App\Http\Controllers;

use App\Models\Clothing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClothingController extends Controller
{
    public function index(Request $request)
    {
        $query = Clothing::with('category')->where('user_id', $request->user()->id);

        // Handle filtering
        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Handle search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('color', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $clothings = $query->latest()->get();

        return response()->json($clothings);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'color' => 'nullable|string|max:255',
            'size' => 'nullable|string|max:50',
            'brand' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except('image');
        $data['user_id'] = $request->user()->id;

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('clothing_images', 'public');
            $data['image_path'] = $path;
        }

        $clothing = Clothing::create($data);

        return response()->json([
            'message' => 'Clothing item created successfully',
            'clothing' => $clothing
        ], 201);
    }

    public function show(Request $request, Clothing $clothing)
    {
        // Check if the clothing item belongs to the authenticated user
        if ($clothing->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized access'
            ], 403);
        }

        return response()->json($clothing->load('category'));
    }

    public function update(Request $request, Clothing $clothing)
    {
        // Check if the clothing item belongs to the authenticated user
        if ($clothing->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized access'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'color' => 'nullable|string|max:255',
            'size' => 'nullable|string|max:50',
            'brand' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except('image');

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($clothing->image_path) {
                Storage::disk('public')->delete($clothing->image_path);
            }
            
            $path = $request->file('image')->store('clothing_images', 'public');
            $data['image_path'] = $path;
        }

        $clothing->update($data);

        return response()->json([
            'message' => 'Clothing item updated successfully',
            'clothing' => $clothing
        ]);
    }

    public function destroy(Request $request, Clothing $clothing)
    {
        // Check if the clothing item belongs to the authenticated user
        if ($clothing->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized access'
            ], 403);
        }

        // Delete image if exists
        if ($clothing->image_path) {
            Storage::disk('public')->delete($clothing->image_path);
        }

        $clothing->delete();

        return response()->json([
            'message' => 'Clothing item deleted successfully'
        ]);
    }
}