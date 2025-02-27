<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Tops', 'description' => 'Shirts, T-shirts, Blouses, etc.'],
            ['name' => 'Bottoms', 'description' => 'Pants, Jeans, Shorts, Skirts, etc.'],
            ['name' => 'Dresses', 'description' => 'All types of dresses'],
            ['name' => 'Outerwear', 'description' => 'Jackets, Coats, Sweaters, etc.'],
            ['name' => 'Footwear', 'description' => 'Shoes, Boots, Sandals, etc.'],
            ['name' => 'Accessories', 'description' => 'Belts, Hats, Scarves, etc.'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}