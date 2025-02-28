<?php
// database/seeders/CategorySeeder.php
namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Tops', 'description' => 'Shirts, blouses, t-shirts'],
            ['name' => 'Bottoms', 'description' => 'Pants, shorts, skirts'],
            ['name' => 'Dresses', 'description' => 'All types of dresses'],
            ['name' => 'Outerwear', 'description' => 'Jackets, coats, sweaters'],
            ['name' => 'Shoes', 'description' => 'All types of footwear'],
            ['name' => 'Accessories', 'description' => 'Belts, scarves, hats, jewelry'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
