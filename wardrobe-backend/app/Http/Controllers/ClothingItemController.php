<?php
// app/Http/Controllers/ClothingItemController.php
namespace App\Http\Controllers;

use App\Models\ClothingItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClothingItemController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->clothingItems()->with('category');

        // Apply search filter if provided
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('brand', 'like', "%{$search}%")
                    ->orWhere('color', 'like', "%{$search}%");
            });
        }

        // Apply category filter if provided
        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        // Apply favorite filter if provided
        if ($request->has('favorite')) {
            $query->where('favorite', $request->favorite === 'true');
        }

        $items = $query->latest()->get();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'color' => 'required|string|max:50',
            'size' => 'nullable|string|max:20',
            'brand' => 'nullable|string|max:100',
            'favorite' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('clothing_images', 'public');
            $validated['image_path'] = $path;
        }

        $validated['user_id'] = $request->user()->id;
        $item = ClothingItem::create($validated);

        return response()->json($item, 201);
    }

    public function show(Request $request, ClothingItem $clothingItem)
    {
        // Ensure the user owns the clothing item
        if ($request->user()->id !== $clothingItem->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($clothingItem->load('category'));
    }

    public function update(Request $request, ClothingItem $clothingItem)
    {
        // Ensure the user owns the clothing item
        if ($request->user()->id !== $clothingItem->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
            'description' => 'nullable|string',
            'color' => 'sometimes|required|string|max:50',
            'size' => 'nullable|string|max:20',
            'brand' => 'nullable|string|max:100',
            'favorite' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($clothingItem->image_path) {
                Storage::disk('public')->delete($clothingItem->image_path);
            }
            
            $path = $request->file('image')->store('clothing_images', 'public');
            $validated['image_path'] = $path;
        }

        $clothingItem->update($validated);

        return response()->json($clothingItem);
    }

    public function destroy(Request $request, ClothingItem $clothingItem)
    {
        // Ensure the user owns the clothing item
        if ($request->user()->id !== $clothingItem->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete image if exists
        if ($clothingItem->image_path) {
            Storage::disk('public')->delete($clothingItem->image_path);
        }

        $clothingItem->delete();

        return response()->json(['message' => 'Item deleted successfully'], 200);
    }

    public function toggleFavorite(Request $request, ClothingItem $clothingItem)
    {
        // Ensure the user owns the clothing item
        if ($request->user()->id !== $clothingItem->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $clothingItem->favorite = !$clothingItem->favorite;
        $clothingItem->save();

        return response()->json($clothingItem);
    }
}