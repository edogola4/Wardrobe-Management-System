<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Clothing;
use Illuminate\Http\Request;

class ClothingController extends Controller
{
    public function index()
    {
        return Clothing::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|string',
            'description' => 'nullable|string',
        ]);

        $clothing = Clothing::create($validatedData);
        return response()->json($clothing, 201);
    }

    public function show($id)
    {
        return Clothing::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $clothing = Clothing::findOrFail($id);
        $clothing->update($request->all());
        return response()->json($clothing, 200);
    }

    public function destroy($id)
    {
        Clothing::destroy($id);
        return response()->json(null, 204);
    }
}
