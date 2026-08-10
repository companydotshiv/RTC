<?php
// Centralized Data Repository for RTC Foods (Using Authentic Assets from rtcfoods.in)

$categories = [
    'dry-fruits' => [
        'name' => 'Dry Fruits & Nuts',
        'icon' => 'fa-seedling',
        'desc' => 'Handpicked jumbo cashews, almonds, walnuts & pistachios sourced directly from premium growers.'
    ],
    'spices' => [
        'name' => 'Spices & Herbs',
        'icon' => 'fa-pepper-hot',
        'desc' => 'Aromatic spices and authentic herbs crafted to elevate taste and rich culinary traditions.'
    ],
    'seeds-berries' => [
        'name' => 'Seeds & Berries',
        'icon' => 'fa-leaf',
        'desc' => 'Nutrient-rich poppy seeds, chia, pumpkin, flax seeds and delicious sun-dried berries.'
    ],
    'gifting' => [
        'name' => 'Corporate & Festive Gifting',
        'icon' => 'fa-gift',
        'desc' => 'Custom packaged luxury boxes for corporate celebrations, weddings, and special events.'
    ]
];

$products = [
    [
        'id' => 1,
        'slug' => 'california-almonds',
        'name' => 'California Almonds',
        'category' => 'dry-fruits',
        'category_name' => 'Dry Fruits & Nuts',
        'price' => 274,
        'original_price' => 350,
        'badge' => 'New',
        'rating' => 4.9,
        'reviews_count' => 128,
        'image' => 'almonds.jpg',
        'gallery' => [
            'almonds.jpg',
            'cashew.jpg'
        ],
        'short_desc' => 'Sweet, crunchy, and packed with Vitamin E and Fiber. Handpicked jumbo almonds imported straight from California.',
        'description' => 'Our Premium California Almonds are renowned for their golden color, consistent kernel size, and crisp snap. Naturally low in carbohydrates and loaded with antioxidant Vitamin E, these almonds make the ideal daily energy snack or breakfast addition.',
        'weights' => ['250g', '500g', '1kg'],
        'sku' => 'RTC-ALM-CAL',
        'stock' => true,
        'origin' => 'California, USA',
        'shelf_life' => '12 Months',
        'nutrition' => [
            'Calories' => '579 kcal',
            'Protein' => '21g',
            'Total Fat' => '49g',
            'Carbohydrates' => '22g',
            'Dietary Fiber' => '12.5g',
            'Vitamin E' => '171% DV'
        ],
        'features' => [
            'Non-GMO & 100% Pure Raw Kernels',
            'Ideal for soaking overnight & daily brain health',
            'High dietary fiber & Heart-Healthy fats',
            'Hygienic barrier packaging'
        ]
    ],
    [
        'id' => 2,
        'slug' => 'cashew-whole',
        'name' => 'Premium Whole Cashews',
        'category' => 'dry-fruits',
        'category_name' => 'Dry Fruits & Nuts',
        'price' => 301,
        'original_price' => 380,
        'badge' => 'Bestseller',
        'rating' => 4.9,
        'reviews_count' => 142,
        'image' => 'cashew.jpg',
        'gallery' => [
            'cashew.jpg',
            'almonds.jpg'
        ],
        'short_desc' => 'Extra creamy whole cashews carefully sorted and hygienic sealed for maximum freshness and buttery richness.',
        'description' => 'RTC Foods brings you King Grade Whole Cashews - processed in state-of-the-art sorting facilities, and packed in nitrogen-flushed packages to maintain zero loss of aroma and crunch. Rich in essential minerals, healthy mono-unsaturated fats, and plant-based protein.',
        'weights' => ['250g', '500g', '1kg'],
        'sku' => 'RTC-CAS-W1',
        'stock' => true,
        'origin' => 'India',
        'shelf_life' => '9 Months',
        'nutrition' => [
            'Calories' => '553 kcal',
            'Protein' => '18g',
            'Total Fat' => '44g',
            'Carbohydrates' => '30g',
            'Dietary Fiber' => '3.3g'
        ],
        'features' => [
            '100% Raw & Natural - No Preservatives',
            'Triple Machine Sorted for Uniform Size & Grade',
            'Rich buttery taste with crunchy texture',
            'Resealable Zip-lock barrier packaging'
        ]
    ],
    [
        'id' => 3,
        'slug' => 'poppy-seeds',
        'name' => 'Pure White Poppy Seeds (Khas Khas)',
        'category' => 'seeds-berries',
        'category_name' => 'Seeds & Berries',
        'price' => 27,
        'original_price' => 40,
        'badge' => 'Pure Grade',
        'rating' => 4.8,
        'reviews_count' => 95,
        'image' => 'poppy_seeds.jpg',
        'gallery' => [
            'poppy_seeds.jpg'
        ],
        'short_desc' => 'Nutrient-rich, unadulterated white poppy seeds perfect for Indian culinary gravies, sweets, and traditional recipes.',
        'description' => 'Sourced directly from verified growers, our Poppy Seeds are thoroughly cleaned to ensure absolute zero impurities. Great source of calcium, magnesium, and dietary fiber.',
        'weights' => ['100g', '250g', '500g', '1kg'],
        'sku' => 'RTC-POP-01',
        'stock' => true,
        'origin' => 'India',
        'shelf_life' => '12 Months',
        'nutrition' => [
            'Calories' => '525 kcal',
            'Protein' => '18g',
            'Total Fat' => '42g',
            'Calcium' => '1438 mg'
        ],
        'features' => [
            '100% Cleaned & De-dusted',
            'Rich in essential minerals & healthy oils',
            'Authentic flavor enhancer for Indian gravies',
            'Vacuum sealed pouch'
        ]
    ]
];

function getProductById($id) {
    global $products;
    foreach ($products as $p) {
        if ($p['id'] == $id) return $p;
    }
    return $products[0];
}

function getProductsByCategory($category = 'all') {
    global $products;
    if ($category === 'all' || empty($category)) {
        return $products;
    }
    return array_filter($products, function($p) use ($category) {
        return $p['category'] === $category;
    });
}
