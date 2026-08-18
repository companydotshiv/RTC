import type { Product, Category } from '../types/product';

export const categories: Category[] = [
  {
    id: 'dry-fruits',
    name: 'Dry Fruits & Nuts',
    icon: 'Apple',
    desc: 'Handpicked jumbo cashews, almonds, walnuts & pistachios sourced directly from premium growers.',
    subcategories: ['Almonds', 'Cashew', 'Dried Apricot', 'Raisins', 'Walnut']
  },
  {
    id: 'spices',
    name: 'Spices & Herbs',
    icon: 'Flame',
    desc: 'Aromatic spices and authentic herbs crafted to elevate taste and rich culinary traditions.'
  },
  {
    id: 'seeds-berries',
    name: 'Seeds & Berries',
    icon: 'Leaf',
    desc: 'Nutrient-rich poppy seeds, chia, pumpkin, flax seeds and delicious sun-dried berries.'
  },
  {
    id: 'dehydrated-fruits',
    name: 'Dehydrated Fruits',
    icon: 'Apple',
    desc: 'Exotic dried kiwis, whole cranberries, and tangy dehydrated fruits.'
  },
  {
    id: 'chemical-herbs',
    name: 'Chemical & Herbs',
    icon: 'Flame',
    desc: 'Pure quality monosodium glutamate, kasuri methi and premium culinary herbs & seasonings.'
  },
  {
    id: 'gifting',
    name: 'Corporate & Festive Gifting',
    icon: 'Gift',
    desc: 'Custom packaged luxury boxes for corporate celebrations, weddings, and special events.'
  }
];

export const products: Product[] = [
  {
    id: 1,
    slug: 'california-almonds',
    name: 'California Almonds',
    category: 'dry-fruits',
    categoryName: 'Dry Fruits & Nuts',
    subCategory: 'Almonds',
    price: 274,
    priceDisplay: '₹274.00',
    originalPrice: 274,
    badge: '',
    rating: 4.9,
    reviewsCount: 128,
    image: '/california_almonds_pouch.png',
    gallery: [
      '/california_almonds_pouch.png',
      '/california_almonds_back.png',
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Sweet, crunchy, and packed with Vitamin E and Fiber. Handpicked jumbo almonds imported straight from California.',
    description: 'Our Premium California Almonds are renowned for their golden color, consistent kernel size, and crisp snap. Naturally low in carbohydrates and loaded with antioxidant Vitamin E, these almonds make the ideal daily energy snack or breakfast addition.',
    weights: ['250g', '500g', '1kg'],
    sku: 'RTC-ALM-CAL',
    stock: true,
    origin: 'U.S.A.',
    shelfLife: '12 Months',
    bullets: [
      { title: 'Premium Quality', text: 'Carefully selected California almonds known for their excellent quality and taste.' },
      { title: 'Origin', text: "Sourced from California, USA, one of the world's leading almond-growing regions." },
      { title: 'Rich & Crunchy', text: 'Naturally crunchy with a mildly sweet, delicious flavour.' },
      { title: 'Naturally Nutritious', text: 'A natural source of protein, fibre and healthy fats.' },
      { title: 'Versatile Snack', text: 'Perfect for snacking, baking, desserts, smoothies and everyday recipes.' },
      { title: 'Fresh & Wholesome', text: 'Packed to help retain freshness, crunch and natural flavour.' },
      { title: 'Everyday Goodness', text: 'A convenient addition to a balanced and wholesome lifestyle.' }
    ],
    additionalInfoTable: [
      { label: 'Country of Origin', value: 'U.S.A.' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Product Name', value: 'RTC California Almonds' },
      { label: 'Additive Information', value: 'Refer to the product packaging.' },
      { label: 'Product Dimensions', value: '20 × 15 × 3.5 cm (L × W × H)' },
      { label: 'Manufacturer/Packer', value: 'RTC Foods' },
      { label: 'Manufacturer/Packer Address', value: 'India' },
      { label: 'Ingredients', value: 'Refer to the product packaging.' },
      { label: 'Consumer Care', value: 'RTC Foods — info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC California Almonds are a smart choice for anyone who wants to enjoy premium dry fruits as part of their daily routine. Whether you are packing a lunch box, preparing breakfast, or looking for a quick evening snack, these almonds fit perfectly into every lifestyle. Their natural taste makes them easy to enjoy on their own or with other healthy foods.',
      'Almonds have been a trusted part of everyday diets for generations because they are simple, wholesome, and easy to include in different meals. They pair well with fresh fruits, oats, yogurt, granola, and homemade trail mixes. You can also chop or slice them to add extra texture to salads, rice dishes, sweets, and festive recipes. Their pleasant taste blends well with both sweet and savoury dishes, making them a useful ingredient in every kitchen.',
      'If you are searching for premium California almonds online, RTC Foods offers a product that is suitable for everyday use at home, in offices, schools, and while travelling. They are a convenient snack that requires no preparation, making them ideal for busy mornings and active lifestyles. Keep a pack in your kitchen, office drawer, or travel bag whenever you need a quick and satisfying bite.',
      'Choosing good quality dry fruits is an easy way to bring more natural foods into your daily meals. RTC California Almonds are suitable for families who value quality, freshness, and great taste. Whether you enjoy them every day or use them for special recipes, they are a pantry essential that can be enjoyed throughout the year.',
      'With RTC Foods, you can enjoy premium dry fruits that are selected with care and packed to meet high quality standards. Add RTC California Almonds to your shopping list and make every snack or recipe a little more wholesome and delicious.'
    ],
    nutrition: {
      'Calories': '579 kcal',
      'Protein': '21g',
      'Total Fat': '49g'
    },
    features: [
      'Non-GMO & 100% Pure Raw Kernels',
      'Ideal for soaking overnight & daily brain health'
    ]
  },
  {
    id: 2,
    slug: 'chia-seeds',
    name: 'Chia Seeds',
    category: 'seeds-berries',
    categoryName: 'Seeds',
    price: 27,
    priceDisplay: '₹27.00 – ₹108.00',
    originalPrice: 27,
    badge: '',
    rating: 4.9,
    reviewsCount: 110,
    image: '/chia_seeds_front.jpg',
    gallery: ['/chia_seeds_front.jpg', '/chia_seeds_back.jpg'],
    shortDesc: 'RTC Foods Chia Seeds are premium-quality seeds known for their mild taste, natural crunch, and exceptional nutritional value. Hygienically processed and securely packed to preserve freshness, they are a perfect addition to daily wellness routines. Rich in fiber, plant protein, omega-3 fatty acids, and essential minerals, RTC Foods Chia Seeds support balanced nutrition and healthy living',
    description: 'RTC Foods Chia Seeds are premium-quality seeds known for their mild taste, natural crunch, and exceptional nutritional value. Hygienically processed and securely packed to preserve freshness, they are a perfect addition to daily wellness routines. Rich in fiber, plant protein, omega-3 fatty acids, and essential minerals, RTC Foods Chia Seeds support balanced nutrition and healthy living',
    weights: ['250gm', '100gm', '50GM'],
    sku: 'RTC-CHI-01',
    stock: true,
    origin: 'India',
    shelfLife: '12 Months',
    bullets: [
      { title: '', text: 'RTC Foods Chia Seeds are premium-quality seeds known for their mild taste, natural crunch, and exceptional nutritional value.' },
      { title: '', text: 'Hygienically processed and securely packed to preserve freshness, they are a perfect addition to daily wellness routines.' },
      { title: '', text: 'Rich in fiber, plant protein, omega-3 fatty acids, and essential minerals, RTC Foods Chia Seeds support balanced nutrition and healthy living.' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'India' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Chia Seeds' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 15W x 3.5H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Chia Seeds are a premium pantry ingredient that makes it easy to add natural goodness to your everyday meals. With their mild taste and versatile nature, these tiny seeds blend effortlessly into a wide range of recipes without changing the original flavour. They are a popular choice for people who enjoy healthy cooking and simple, wholesome ingredients.',
      'Chia seeds can be added to smoothies, yogurt, oats, breakfast cereals, granola, fruit bowls, and homemade energy bars. They are also perfect for puddings, milkshakes, salads, baked recipes, and healthy snacks. Simply soak them in water or milk to create a soft texture, or sprinkle them directly over your favourite dishes for added crunch.',
      'Whether you are preparing breakfast, packing lunch, or making a quick evening snack, RTC Chia Seeds are easy to use and fit into every lifestyle. They are suitable for home kitchens, fitness enthusiasts, and anyone looking for premium seeds to include in their daily meals. Their versatility makes them a useful ingredient for both simple and creative recipes.',
      'If you are looking to buy chia seeds online, RTC Foods offers carefully selected chia seeds that are packed to preserve their freshness, purity, and quality. Every pack is prepared with strict quality standards, ensuring a consistently enjoyable experience every time you use them.',
      'RTC Chia Seeds are a must have for every kitchen. Whether you are making smoothies, breakfast bowls, desserts, or healthy snacks, these premium chia seeds add quality, convenience, and natural goodness to your everyday recipes.'
    ],
    nutrition: {
      'Calories': '486 kcal',
      'Fiber': '34g',
      'Protein': '16.5g'
    },
    features: [
      '100% Natural & Pure Chia Seeds',
      'Rich in Omega-3 & Plant Protein',
      'Supports healthy digestion'
    ]
  },
  {
    id: 3,
    slug: 'cashew',
    name: 'Cashew',
    category: 'dry-fruits',
    categoryName: 'Dry Fruits & Nuts',
    subCategory: 'Cashew',
    price: 300,
    priceDisplay: '₹300.00',
    originalPrice: 300,
    badge: '',
    rating: 4.9,
    reviewsCount: 142,
    image: '/cashew_front.png',
    gallery: ['/cashew_front.png', '/cashew_back.png'],
    shortDesc: 'Premium Quality Cashews – Carefully selected whole cashew nuts with a rich, creamy texture and naturally delicious taste.',
    description: 'RTC Cashew is a delicious and versatile dry fruit that can be enjoyed by people of all ages. With its naturally creamy taste, it is a favourite ingredient in homes, restaurants, and bakeries.',
    weights: ['50GM'],
    sku: 'RTC-CAS-W1',
    stock: true,
    origin: 'India',
    shelfLife: '9 Months',
    bullets: [
      { title: 'Premium Quality Cashews', text: 'Carefully selected whole cashew nuts with a rich, creamy texture and naturally delicious taste.' },
      { title: 'Rich in Nutrients', text: 'A good source of healthy fats, protein, dietary fiber, vitamins, and essential minerals like magnesium and zinc.' },
      { title: 'Healthy Snacking Option', text: 'Perfect for guilt-free snacking, providing long-lasting energy throughout the day.' },
      { title: 'Versatile Use', text: 'Ideal for desserts, curries, gravies, baking, smoothies, and dry fruit mixes.' },
      { title: 'Fresh & Hygienically Packed', text: 'Sealed in food-grade packaging to preserve freshness, crunch, and natural flavor.' },
      { title: 'Naturally Delicious', text: 'No artificial colors or preservatives; suitable for everyday consumption.' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'India' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Cashew' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 13W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Cashew is a delicious and versatile dry fruit that can be enjoyed by people of all ages. With its naturally creamy taste, it is a favourite ingredient in homes, restaurants, and bakeries. Whether you are preparing everyday meals or festive dishes, cashew nuts add richness and a satisfying texture to every recipe.',
      'Cashews are commonly used in Indian kitchens to prepare sweets, rich curries, gravies, and traditional recipes. They can also be blended into a smooth paste for creamy sauces or added to pulao, biryani, and desserts for extra flavour. Their mild taste makes them easy to pair with fruits, cereals, yogurt, and homemade snack mixes. You can even use them to prepare dairy free spreads, plant based milk, or homemade nut butter.',
      'A pack of quality cashew nuts is always useful to have at home because they can be enjoyed in many different ways. Keep them in your kitchen for quick snacks, lunch boxes, festive cooking, or special occasions. Their natural taste makes them a great choice for both simple recipes and gourmet dishes.',
      'If you are looking to buy premium cashew nuts online, RTC Foods offers cashews that are selected with care to deliver excellent quality and a satisfying eating experience. They are suitable for everyday use and are a pantry essential for anyone who enjoys cooking, baking, or preparing healthy snacks at home.',
      'RTC Cashew is a great choice for families who value quality ingredients and authentic taste. Add them to your daily meals, festive recipes, or favourite desserts and enjoy the rich flavour that makes cashews one of the most loved dry fruits around the world.'
    ],
    nutrition: {
      'Calories': '553 kcal',
      'Protein': '18g'
    },
    features: [
      '100% Raw & Natural - No Preservatives',
      'Triple Machine Sorted for Uniform Size & Grade'
    ]
  },
  {
    id: 15,
    slug: 'dried-apricot',
    name: 'Dried Apricot',
    category: 'dry-fruits',
    categoryName: 'Dry Fruits & Nuts',
    subCategory: 'Dried Apricot',
    price: 123,
    priceDisplay: '₹123.00',
    originalPrice: 123,
    badge: '',
    rating: 4.8,
    reviewsCount: 86,
    image: '/dried_apricot_front.png',
    gallery: ['/dried_apricot_front.png', '/dried_apricot_back.png'],
    shortDesc: '10 in stock. Premium Quality Apricots – Handpicked, naturally sun-dried for rich taste. Naturally Sweet & Delicious – No added artificial flavors or preservatives.',
    description: 'RTC Dried Apricot Gold is a premium dried fruit that offers a naturally sweet taste and soft, enjoyable texture in every bite. Carefully selected for quality, these dried apricots are a delicious choice for people who enjoy wholesome snacks and naturally sweet foods.',
    weights: ['250gm'],
    productTypes: ['Gold'],
    sku: 'RTC-APR-GLD',
    stock: true,
    stockCount: 10,
    origin: 'Afganistan',
    shelfLife: '12 Months',
    bullets: [
      { title: 'Premium Quality Apricots', text: 'Handpicked, naturally sun-dried for rich taste' },
      { title: 'Naturally Sweet & Delicious', text: 'No added artificial flavors or preservatives' },
      { title: 'Rich in Nutrients', text: 'High in fiber, vitamins (A & C), and antioxidants' },
      { title: 'Healthy Snacking Option', text: 'Ideal for boosting energy anytime, anywhere' },
      { title: 'Supports Digestion', text: 'Helps maintain gut health due to high fiber content' },
      { title: 'Multipurpose Use', text: 'Perfect for snacks, desserts, smoothies, and baking' },
      { title: 'Hygienically Packed', text: 'Ensures freshness, purity, and long shelf life' },
      { title: 'Perfect for All Ages', text: 'A nutritious choice for kids and adults alike' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'Afganistan' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Dried Apricot (Gold)' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 15W x 3.5H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Dried Apricot Gold is a premium dried fruit that offers a naturally sweet taste and soft, enjoyable texture in every bite. Carefully selected for quality, these dried apricots are a delicious choice for people who enjoy wholesome snacks and naturally sweet foods. They are easy to carry, ready to eat, and suitable for every age group.',
      'Dried apricots are a versatile ingredient that can be enjoyed in many ways. Eat them straight from the pack as a quick snack or add them to breakfast cereals, oats, yogurt, and smoothie bowls for extra flavour. They also work wonderfully in cakes, cookies, muffins, puddings, homemade energy bars, and festive desserts. Their natural sweetness makes them an excellent ingredient for recipes without relying on extra sugar.',
      'Whether you are packing a lunch box, travelling, or looking for a convenient snack during a busy day, RTC Dried Apricot Gold is an excellent choice. Keep a pack at home, in your office, or in your travel bag so you always have a delicious dried fruit ready to enjoy. They also make a wonderful addition to premium dry fruit gift boxes during festivals and special occasions.',
      'If you are looking to buy dried apricots online, RTC Foods offers carefully selected apricots that are packed with care to preserve their taste, texture, and freshness. Every pack is prepared to deliver consistent quality, making it a reliable choice for everyday snacking and cooking.',
      'RTC Dried Apricot Gold is a pantry essential for anyone who enjoys premium dried fruits. Whether you enjoy them on their own or add them to your favourite recipes, they bring natural sweetness and rich flavour to every bite.'
    ],
    nutrition: {
      'Energy (kcal)': '241.0',
      'Protein': '3.39g',
      'Dietary Fiber': '7.3g',
      'Total Fat': '0.51g',
      'Total Carbohydrates': '62.64g',
      'Potassium': '1162 mg',
      'Calcium': '55.0 mg',
      'Iron': '2.66 mg'
    },
    features: [
      'Origin: Afganistan',
      '100% Pure Dried Apricot (Gold)',
      'Rich in Fiber, Vitamins A & C',
      'Freshness Sealed Packaging'
    ]
  },
  {
    id: 16,
    slug: 'indian-raisins',
    name: 'Indian Raisins',
    category: 'dry-fruits',
    categoryName: 'Raisins',
    price: 163,
    priceDisplay: '₹163.00',
    originalPrice: 163,
    badge: '',
    rating: 4.9,
    reviewsCount: 94,
    image: '/indian_raisins_front.png',
    gallery: ['/indian_raisins_front.png', '/indian_raisins_back.png'],
    shortDesc: 'Premium Indian Origin: Sourced from quality farms across India for natural sweetness and freshness. Naturally Sweet & Nutritious: Rich in iron, fiber, and essential nutrients for daily wellness.',
    description: 'RTC Indian Raisins are a delicious dried fruit that brings natural sweetness to your everyday meals and snacks. Carefully selected for their quality, these raisins have a soft texture and pleasant taste that make them a favourite for both children and adults.',
    weights: ['250gm', '1kg'],
    sku: 'RTC-RAI-IND',
    stock: true,
    origin: 'India',
    shelfLife: '12 Months',
    bullets: [
      { title: 'Premium Indian Origin', text: 'Sourced from quality farms across India for natural sweetness and freshness.' },
      { title: 'Naturally Sweet & Nutritious', text: 'Rich in iron, fiber, and essential nutrients for daily wellness.' },
      { title: 'Energy Boosting Snack', text: 'Provides instant energy, making it perfect for daily consumption.' },
      { title: 'Supports Digestion', text: 'Contains natural fiber that helps promote healthy digestion.' },
      { title: 'Soft & Juicy Texture', text: 'Carefully selected raisins with a plump, soft, and delicious taste.' },
      { title: 'Versatile Use', text: 'Ideal for snacking, sweets, baking, cereals, and traditional recipes.' },
      { title: '100% Natural', text: 'No added sugar, preservatives, or artificial flavors.' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'India' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC India Raisins' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '13L x 11W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Indian Raisins are a delicious dried fruit that brings natural sweetness to your everyday meals and snacks. Carefully selected for their quality, these raisins have a soft texture and pleasant taste that make them a favourite for both children and adults. They are easy to enjoy on their own or use in a wide variety of recipes.',
      'Raisins are a versatile pantry ingredient that can be added to breakfast cereals, oats, yogurt, smoothie bowls, and homemade granola. They are also widely used in cakes, cookies, muffins, breads, desserts, kheer, halwa, and festive sweets. Their natural sweetness makes them a great addition to recipes where you want extra flavour without relying on refined sugar.',
      'Keep a pack of RTC Indian Raisins at home, in your office, or while travelling for a convenient snack anytime. They are perfect for school lunch boxes, evening snacks, and homemade trail mixes. Their soft texture and naturally sweet taste make them enjoyable straight from the pack whenever you need a quick bite.',
      'If you are looking to buy premium Indian raisins online, RTC Foods offers carefully selected raisins that are packed with care to preserve their freshness and quality. Every pack is prepared to deliver consistent taste, making them suitable for everyday use in cooking, baking, and snacking.',
      'RTC Indian Raisins are a simple way to add natural sweetness and premium quality dried fruit to your daily routine. Whether you are preparing traditional recipes, baking delicious treats, or enjoying a healthy snack, these raisins are a pantry essential for every home.'
    ],
    nutrition: {
      'Calories': '299 kcal',
      'Protein': '3.1g',
      'Iron': '1.9 mg'
    },
    features: [
      'Origin: India',
      '100% Natural Indian Kishmish',
      'Soft & Plump Texture',
      'No Added Sugar or Preservatives'
    ]
  },
  {
    id: 4,
    slug: 'dry-figs-diamond',
    name: 'Dry Figs Diamond',
    category: 'dry-figs',
    categoryName: 'Dry Figs',
    price: 233,
    priceDisplay: '₹233.00',
    originalPrice: 233,
    badge: '',
    rating: 4.9,
    reviewsCount: 104,
    image: '/dry_figs_front.png',
    gallery: ['/dry_figs_front.png', '/dry_figs_back.jpg'],
    shortDesc: 'Premium Diamond Grade Afghan Anjeer (Dried Figs) naturally sweet with rich flavor and soft texture.',
    description: 'RTC Anjeer Diamond is a premium selection of dried figs chosen for their rich taste, soft bite, and excellent quality.',
    weights: ['250gm'],
    sku: 'RTC-FIG-01',
    stock: true,
    origin: 'Afganistain',
    shelfLife: '9 Months',
    bullets: [
      { title: 'Premium Quality', text: 'Diamond Grade Afghan Anjeer (Dried Figs)' },
      { title: 'Naturally Sweet', text: 'Rich flavor and soft texture' },
      { title: 'Rich in Fiber', text: 'Good source of dietary fiber and essential minerals' },
      { title: 'Energy & Wellness', text: 'Supports daily energy and overall wellness' },
      { title: 'Hygienically Packed', text: 'Carefully selected and hygienically packed' },
      { title: 'Ideal Snacking', text: 'Ideal for healthy snacking and gifting' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'Afganistain' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Anjeer Diamond' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 13W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Anjeer Diamond is a premium selection of dried figs chosen for their rich taste, soft bite, and excellent quality. Loved for their natural sweetness, dried figs are a popular choice for people who enjoy wholesome snacks without adding extra sugar. They are easy to carry, easy to enjoy, and suitable for every age group.',
      'Anjeer can be enjoyed straight from the pack or added to a variety of recipes. Chop them into breakfast bowls, mix them with oats, cereals, or yogurt, or use them in homemade energy bars and trail mixes. They are also a great ingredient for cakes, cookies, sweets, and festive desserts. Their naturally sweet flavour makes them a perfect addition to both traditional and modern recipes.',
      'Many families keep dried figs at home because they are a convenient snack for busy days. They fit easily into school lunch boxes, office snack breaks, travel bags, and evening refreshments. Their soft texture and pleasant taste make them an enjoyable choice whenever you want a naturally sweet treat.',
      'If you are looking to buy premium Afghan Anjeer online, RTC Foods offers carefully selected dried figs that deliver quality and freshness in every pack. They are packed with care to help maintain their natural taste and texture, making them suitable for everyday use as well as special occasions.',
      'Whether you are preparing healthy recipes, serving guests, or looking for a thoughtful dry fruit gift, RTC Anjeer Diamond is a reliable choice. Enjoy the authentic taste of premium dried figs and make them a part of your daily kitchen essentials.'
    ],
    nutrition: {
      'Calories': '249 kcal',
      'Dietary Fiber': '9.8g'
    },
    features: [
      '100% Natural Afghan Anjeer',
      'Rich in Iron & Calcium'
    ]
  },
  {
    id: 5,
    slug: 'exotic-dried-kiwi',
    name: 'Exotic Dried Kiwi',
    category: 'dehydrated-fruits',
    categoryName: 'Dehydrated Fruits',
    price: 171,
    priceDisplay: '₹171.00',
    originalPrice: 171,
    badge: '',
    rating: 4.8,
    reviewsCount: 64,
    image: '/exotic_kiwi_front.png',
    gallery: ['/exotic_kiwi_front.png', '/exotic_kiwi_back.jpg'],
    shortDesc: 'Premium exotic dried kiwi sourced from Thailand. Delightfully sweet and tangy tropical flavor.',
    description: 'Our Exotic Dried Kiwi slices retain their natural vibrant green hue and zesty flavor. Perfect for daily snacking, dessert garnishes, and trail mixes.',
    weights: ['200g'],
    sku: 'RTC-KIW-01',
    stock: true,
    origin: 'Thailand',
    shelfLife: '9 Months',
    bullets: [
      { title: '', text: 'Premium exotic dried kiwi sourced from Thailand' },
      { title: '', text: 'Delightfully sweet and tangy tropical flavor' },
      { title: '', text: 'Soft and chewy texture with vibrant natural color' },
      { title: '', text: 'Perfect healthy snack for anytime cravings' },
      { title: '', text: 'Ideal for desserts, cereals, smoothies, and baking' },
      { title: '', text: 'Rich in dietary fiber and antioxidants' },
      { title: '', text: 'Great addition to trail mixes and fruit platters' },
      { title: '', text: 'Carefully selected premium-quality kiwi slices' },
      { title: '', text: 'Hygienically processed and packed for freshness' },
      { title: '', text: 'Convenient snack for home, office, or travel' },
      { title: '', text: 'Adds a tropical twist to recipes and beverages' },
      { title: '', text: 'Freshness-sealed packaging for long-lasting taste and quality' }
    ],
    additionalInfoTable: [
      { label: 'Care Instructions', value: 'Lower temperature washes and delicate spin cycles are gentler on garment, helping to maintain the color, shape and structure of the fabric. At the same time it reduces energy consumption that is used in care processes.' },
      { label: 'Model Wears', value: 'UK 10/ EU 38/ US 6' },
      { label: 'Occasion', value: 'Lifestyle, Sport' },
      { label: 'Country', value: 'Italy' },
      { label: 'Outer', value: 'Leather 100%, Polyamide 100%' },
      { label: 'Lining', value: 'Polyester 100%' },
      { label: 'CounSoletry', value: 'Rubber 100%' }
    ],
    paragraphs: [
      'Premium exotic dried kiwi sourced from Thailand, prepared to retain its vibrant natural green color and deliciously sweet-tangy flavor.',
      'Soft and chewy slices perfect for everyday healthy snacking, cereal bowls, desserts, and tropical smoothies.'
    ],
    nutrition: {
      'Calories': '340 kcal',
      'Vitamin C': '200% DV',
      'Dietary Fiber': '8g'
    },
    features: [
      'Dehydrated to retain max nutrients',
      'Sweet & Tangy natural fruit taste',
      'Rich in antioxidants'
    ]
  },
  {
    id: 6,
    slug: 'walnut-kernels-platinum',
    name: 'Walnut Kernels Platinum',
    category: 'dry-fruits',
    categoryName: 'Dry fruits',
    price: 420,
    priceDisplay: '₹420.00',
    originalPrice: 420,
    badge: '',
    rating: 4.9,
    reviewsCount: 88,
    image: '/walnut_platinum_front.jpg',
    gallery: ['/walnut_platinum_front.jpg', '/walnut_platinum_back.png'],
    shortDesc: 'Top – Quality 2- Piece Walnut Kernels Sourced From Chile, Known For Superior Grade and Consistency.',
    description: 'RTC Walnut Kernels Platinum are premium quality walnut kernels selected for their excellent taste, clean appearance, and consistent quality.',
    weights: ['250gm'],
    productTypes: ['Platinum'],
    sku: 'RTC-WAL-01',
    stock: true,
    origin: 'Chile',
    shelfLife: '9 Months',
    bullets: [
      { title: '', text: 'Premium Chile Origin : Top – Quality 2- Piece Walnut Kernels Sourced From Chile, Known For Superior Grade and Consistency.' },
      { title: '', text: 'Light Color & Fine Quality : Clean, uniform appearance with excellent taste and texture.' },
      { title: '', text: 'Fresh & Hygienically Packed : Carefully processed to retain freshness, crunch, and nutritional value.' },
      { title: '', text: 'Ideal for Premium Use : Perfect for snacking, gifting, baking and high end culinary applications.' },
      { title: '', text: 'RTC Foods Quality Assurance : Trusted quality with strict selection and grading standards.' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'Chile' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Walnut kernels (Platinum)' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '19L x 13W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Walnut Kernels Platinum are premium quality walnut kernels selected for their excellent taste, clean appearance, and consistent quality. Carefully chosen from the finest harvests, these walnut kernels are ideal for people who enjoy premium dry fruits in their everyday meals and special recipes. Their rich nutty flavour and satisfying texture make them a valuable addition to every kitchen.',
      'These premium walnut kernels are perfect for healthy snacking and can also be used in a wide variety of recipes. Add them to breakfast cereals, oats, yogurt, smoothie bowls, homemade granola, and trail mixes for extra crunch and flavour. They are also widely used in cakes, cookies, brownies, muffins, breads, chocolates, desserts, and traditional sweets, making every recipe more delicious.',
      'RTC Walnut Kernels Platinum are suitable for both home cooking and professional kitchens. Whether you are preparing festive treats, premium gift hampers, bakery products, or everyday family meals, these walnut kernels are easy to chop, blend, or use whole. Their premium quality also makes them an excellent choice for gourmet recipes and elegant food presentations.',
      'If you are looking to buy premium walnut kernels online, RTC Foods offers carefully selected walnut kernels that are packed to preserve their freshness, natural taste, and quality. Every pack is prepared with strict quality standards to provide a reliable and enjoyable experience with every serving.',
      'RTC Walnut Kernels Platinum are the perfect choice for anyone looking for premium dry fruits with outstanding quality and versatility. Keep them in your pantry and enjoy delicious walnuts in your snacks, desserts, baking, and everyday cooking.'
    ],
    nutrition: {
      'Calories': '654 kcal',
      'Omega-3': '9.08g',
      'Protein': '15.2g'
    },
    features: [
      'Top Quality 2-Piece Halves',
      'Imported directly from Chile',
      'Rich in Omega-3 and brain nutrients'
    ]
  },
  {
    id: 17,
    slug: 'walnut-kernals-diamond',
    name: 'Walnut Kernals Diamond',
    category: 'dry-fruits',
    categoryName: 'Walnut',
    price: 375,
    priceDisplay: '₹375.00',
    originalPrice: 375,
    badge: '',
    rating: 4.8,
    reviewsCount: 76,
    image: '/walnut_diamond_front.png',
    gallery: ['/walnut_diamond_front.png', '/walnut_diamond_back.jpg'],
    shortDesc: '10 in stock. Premium Chile Origin: High – Quality 2- Piece Walnut Kernals Sourced From India. White & Celan Appearance : Attractive light color with good taste and consistent quality.',
    description: 'RTC Walnut Kernels Diamond are premium quality walnut kernels selected for their excellent appearance, fresh taste, and versatile use. With their light colour and pleasant nutty flavour, these walnut kernels are an ideal choice for everyday meals as well as special recipes.',
    weights: ['250gm'],
    productTypes: ['Diamond'],
    sku: 'RTC-WAL-DMD',
    stock: true,
    stockCount: 10,
    origin: 'Chile',
    shelfLife: '9 Months',
    bullets: [
      { title: 'Premium Chile Origin', text: 'High – Quality 2- Piece Walnut Kernals Sourced From India.' },
      { title: 'White & Celan Appearance', text: 'Attractive light color with good taste and consistent quality.' },
      { title: 'Fresh & Hygenically Packed', text: 'Ensures natural freshness texture, and nutritional intgrity.' },
      { title: 'Perfect for daily use', text: 'Suitable for snacking, cooking,baking and regular consumption.' },
      { title: 'Rtc foods Quality Assurance', text: 'From a brand committed to purity and premium standards.' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'Chile' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Walnut kernals (Diamond)' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '19L x 13W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Walnut Kernels Diamond are premium quality walnut kernels selected for their excellent appearance, fresh taste, and versatile use. With their light colour and pleasant nutty flavour, these walnut kernels are an ideal choice for everyday meals as well as special recipes. They are easy to use and make a valuable addition to every kitchen.',
      'These walnut kernels can be enjoyed straight from the pack or added to a variety of dishes. They are perfect for breakfast cereals, oats, yogurt, smoothie bowls, homemade granola, and trail mixes. They are also widely used in cakes, cookies, brownies, muffins, breads, chocolates, desserts, and traditional sweets, adding a delicious crunch and rich flavour to every recipe.',
      'Whether you are cooking for your family, preparing festive treats, or baking at home, RTC Walnut Kernels Diamond offer convenience and consistent quality. They are easy to chop, blend, or use whole, making them suitable for home kitchens, cafés, bakeries, and professional food preparation.',
      'If you are looking to buy premium walnut kernels online, RTC Foods offers carefully selected walnut kernels that are packed to preserve their freshness and quality. Every pack is prepared with strict quality standards so you can enjoy reliable taste and texture in every serving.',
      'RTC Walnut Kernels Diamond are a smart choice for anyone who enjoys premium dry fruits. Keep them in your pantry and use them in your favourite snacks, desserts, baked goods, and everyday recipes to add rich flavour and natural goodness.'
    ],
    nutrition: {
      'Energy': '654 kcal',
      'Protein': '15.2g'
    },
    features: [
      'Diamond Quality Kernels',
      'Rich in Omega-3'
    ]
  },
  {
    id: 18,
    slug: 'walnut-kernals-gold',
    name: 'Walnut Kernals Gold',
    category: 'dry-fruits',
    categoryName: 'Walnut',
    price: 325,
    priceDisplay: '₹325.00',
    originalPrice: 325,
    badge: '',
    rating: 4.7,
    reviewsCount: 65,
    image: '/walnut_gold_front.png',
    gallery: ['/walnut_gold_front.png', '/walnut_gold_back.png'],
    shortDesc: '10 in stock. Reliable Everyday quality : 2- piece walnut kernals with natural golden color for regular use. Balance Taste & Value : Offers good taste and quality at an economical price point.',
    description: 'RTC Walnut Kernels Gold are a premium everyday dry fruit that combines excellent taste with dependable quality. Carefully packed for regular use, these walnut kernels are a great choice for families who enjoy adding wholesome ingredients to their daily meals.',
    weights: ['250gm'],
    productTypes: ['Gold'],
    sku: 'RTC-WAL-GLD',
    stock: true,
    stockCount: 10,
    origin: 'India',
    shelfLife: '9 Months',
    bullets: [
      { title: 'Reliable Everyday quality', text: '2- piece walnut kernals with natural golden color for regular use.' },
      { title: 'Balance Taste & Value', text: 'Offers good taste and quality at an economical price point.' },
      { title: 'Fresh & hygenically Packed', text: 'Packed to maintain freshness amd usability.' },
      { title: 'Versatile Usage', text: 'Ideal For cooking baking, snacking and daily nutrition.' },
      { title: 'Rtcfoods Quality Assurance', text: 'Consistent quality From a Trusted dry fruit brand.' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'India' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Walnut kernals (Gold)' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '19L x 13W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Walnut Kernels Gold are a premium everyday dry fruit that combines excellent taste with dependable quality. Carefully packed for regular use, these walnut kernels are a great choice for families who enjoy adding wholesome ingredients to their daily meals. Their natural texture and pleasant flavour make them suitable for a wide variety of recipes and snacks.',
      'These walnut kernels can be enjoyed straight from the pack or added to breakfast cereals, oats, yogurt, smoothie bowls, and homemade granola. They are also a popular ingredient for cakes, cookies, brownies, muffins, breads, desserts, chocolates, and traditional sweets. Their rich nutty flavour adds extra taste and texture to both sweet and savoury dishes.',
      'RTC Walnut Kernels Gold are perfect for home kitchens, cafés, and bakeries because they are easy to chop, mix, or blend into recipes. Whether you are preparing festive treats, everyday meals, or homemade snack mixes, these walnut kernels offer convenience and versatility for every occasion.',
      'If you are looking to buy premium walnut kernels online, RTC Foods offers carefully selected walnut kernels that are packed to preserve their freshness and quality. Every pack is prepared to deliver a consistent experience, making them a reliable choice for cooking, baking, and everyday use.',
      'RTC Walnut Kernels Gold are an essential pantry ingredient for anyone who enjoys premium dry fruits. Whether you use them for baking, cooking, or healthy snacking, they provide great taste, dependable quality, and endless ways to enhance your favourite recipes.'
    ],
    nutrition: {
      'Energy': '654 kcal',
      'Protein': '15.2g'
    },
    features: [
      'Gold Quality Kernels',
      'Rich in Omega-3'
    ]
  },
  {
    id: 19,
    slug: 'walnut-kernals-silver',
    name: 'Walnut Kernals Silver',
    category: 'dry-fruits',
    categoryName: 'Walnut',
    price: 312,
    priceDisplay: '₹312.00',
    originalPrice: 312,
    badge: '',
    rating: 4.6,
    reviewsCount: 58,
    image: '/walnut_silver_front.png',
    gallery: ['/walnut_silver_front.png', '/walnut_silver_back.png'],
    shortDesc: '10 in stock. Economical 4 – piece kernals: Value pack walnut kernals suitable for bulk and daily use. White Apperanance : Clean look with Practical quality for regular consumption.',
    description: 'RTC Walnut Kernels Silver are a practical choice for families, home cooks, and bakeries looking for quality walnuts at great value. These walnut kernels are suitable for everyday use and can be easily added to a wide variety of recipes.',
    weights: ['250gm'],
    productTypes: ['Silver'],
    sku: 'RTC-WAL-SLV',
    stock: true,
    stockCount: 10,
    origin: 'U.S.A',
    shelfLife: '9 Months',
    bullets: [
      { title: 'Economical 4 – piece kernals', text: 'Value pack walnut kernals suitable for bulk and daily use.' },
      { title: 'White Apperanance', text: 'Clean look with Practical quality for regular consumption.' },
      { title: 'Fresh & hygenically Packed', text: 'Freshness and usability for longer duration.' },
      { title: 'Best for cooking & Baking', text: 'Ideal for recipes, deserts, and large – scale usage.' },
      { title: 'Rtc Foods Quality Assurance', text: 'Affordable option witrhout compromising on essential quality.' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'U.S.A' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Walnut kernals (Silver)' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '19L x 13W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Walnut Kernels Silver are a practical choice for families, home cooks, and bakeries looking for quality walnuts at great value. These walnut kernels are suitable for everyday use and can be easily added to a wide variety of recipes. Their mild nutty flavour and crunchy texture make them a useful ingredient for both sweet and savoury dishes.',
      'Walnut kernels are widely used in baking, cooking, and homemade snacks. Add them to cakes, cookies, brownies, muffins, breads, and desserts for extra crunch and flavour. They are also perfect for breakfast cereals, oats, yogurt, smoothie bowls, salads, and homemade trail mixes. Their versatility makes them a pantry essential for everyday meal preparation.',
      'Whether you are preparing festive sweets, family meals, or recipes in larger quantities, RTC Walnut Kernels Silver offer convenience and consistent quality. They are easy to chop, blend, or use directly, making them suitable for home kitchens as well as commercial food preparation.',
      'If you are looking to buy walnut kernels online, RTC Foods offers carefully packed walnut kernels that are prepared to maintain freshness and quality. Every pack is designed to provide a reliable cooking and baking ingredient that delivers great taste and convenience for daily use.',
      'RTC Walnut Kernels Silver are an excellent option for anyone who wants premium quality walnuts for regular cooking, baking, and snacking. Keep them in your kitchen and enjoy the convenience of a versatile dry fruit that can be used in countless recipes throughout the year.'
    ],
    nutrition: {
      'Energy': '654 kcal',
      'Protein': '15.2g'
    },
    features: [
      'Silver Quality Kernels',
      'Rich in Omega-3'
    ]
  },
  {
    id: 20,
    slug: 'dry-figs-gold',
    name: 'Dry Figs Gold',
    category: 'dry-figs',
    categoryName: 'Dry Figs',
    price: 250,
    priceDisplay: '₹250.00',
    originalPrice: 250,
    badge: '',
    rating: 4.8,
    reviewsCount: 92,
    image: '/dry_figs_gold_front.png',
    gallery: ['/dry_figs_gold_front.png', '/dry_figs_gold_back.png'],
    shortDesc: '10 in stock. Premium quality Gold dry figs sourced from Afghanistan. Naturally large size, soft texture & rich sweetness.',
    description: 'RTC Dry Figs Gold are a premium dried fruit known for their naturally sweet taste, soft texture, and excellent quality. Carefully selected for everyday enjoyment, these dried figs are a delicious choice for people who prefer wholesome snacks made from natural ingredients.',
    weights: ['250gm'],
    productTypes: ['Gold'],
    sku: 'RTC-FIG-GLD',
    stock: true,
    stockCount: 10,
    origin: 'Afganistain',
    shelfLife: '9 Months',
    bullets: [
      { title: '', text: 'Premium quality Gold dry figs sourced from Afghanistan' },
      { title: '', text: 'Naturally large size, soft texture & rich sweetness' },
      { title: '', text: 'High in dietary fiber, calcium & antioxidants' },
      { title: '', text: 'Supports digestion, bone strength & overall wellness' },
      { title: '', text: 'Naturally dried with no added preservatives or chemicals' },
      { title: '', text: 'Carefully sorted, cleaned & hygienically packed' },
      { title: '', text: 'Ideal for healthy snacking, desserts & daily nutrition' },
      { title: '', text: 'Perfect for fasting, gifting & festive use' },
      { title: '', text: 'Best stored in a cool & dry place for freshness' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'Afganistain' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Dry Figs (Gold)' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 15W x 3.5H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Dry Figs Gold are a premium dried fruit known for their naturally sweet taste, soft texture, and excellent quality. Carefully selected for everyday enjoyment, these dried figs are a delicious choice for people who prefer wholesome snacks made from natural ingredients. They are easy to carry, ready to eat, and suitable for both children and adults.',
      'Dry figs are a versatile ingredient that can be enjoyed in many different ways. Eat them straight from the pack as a quick snack or add them to breakfast cereals, oats, yogurt, and smoothie bowls for extra flavour. They are also perfect for cakes, cookies, muffins, energy bars, desserts, and traditional Indian sweets. Their natural sweetness makes them a popular ingredient in recipes without the need for additional sweeteners.',
      'Whether you are preparing lunch boxes, travelling, observing fasting, or looking for a convenient snack during the day, RTC Dry Figs Gold are an excellent choice. They are also a thoughtful addition to festive dry fruit hampers and gift boxes, making them suitable for celebrations and special occasions.',
      'If you are looking to buy premium dry figs online, RTC Foods offers carefully selected dried figs that are packed with care to maintain their freshness, taste, and quality. Every pack is prepared to deliver a consistently enjoyable experience, making them a reliable choice for everyday snacking and cooking.',
      'RTC Dry Figs Gold are a pantry essential for anyone who enjoys premium dried fruits. Whether you enjoy them on their own or use them in your favourite recipes, they bring natural sweetness, rich flavour, and premium quality to every bite.'
    ],
    nutrition: {
      'Energy': '249 kcal',
      'Dietary Fiber': '9.8g'
    },
    features: [
      '100% Natural Afghan Anjeer (Gold)',
      'Rich in Iron & Calcium'
    ]
  },
  {
    id: 21,
    slug: 'dry-dates',
    name: 'Dry Dates',
    category: 'dry-fruits',
    categoryName: 'Dry Dates',
    price: 120,
    priceDisplay: '₹120.00',
    originalPrice: 120,
    badge: '',
    rating: 4.8,
    reviewsCount: 74,
    image: '/dry_dates_front.jpg',
    gallery: ['/dry_dates_front.jpg', '/dry_dates_back.png'],
    shortDesc: '10 in stock. Premium quality Jumbo size dry dates sourced directly from Iran. Attractive golden color with firm & chewy texture.',
    description: 'RTC Dry Dates Gold are a premium dried fruit that offers a naturally pleasant taste and satisfying chewy texture. Carefully selected for quality, these dry dates are a wholesome snack that can be enjoyed by people of all ages.',
    weights: ['250gm'],
    productTypes: ['Gold'],
    sku: 'RTC-DAT-GLD',
    stock: true,
    stockCount: 10,
    origin: 'iran',
    shelfLife: '12 Months',
    bullets: [
      { title: '', text: 'Premium quality Jumbo size dry dates sourced directly from Iran' },
      { title: '', text: 'Attractive golden color with firm & chewy texture' },
      { title: '', text: 'Naturally mild sweet taste with nutty flavor' },
      { title: '', text: 'Rich in dietary fiber, iron & potassium for daily nutrition' },
      { title: '', text: 'Helps support digestion, energy & overall health' },
      { title: '', text: 'Carefully cleaned and hygienically packed' },
      { title: '', text: 'Ideal for healthy snacking, gifting & daily consumption' },
      { title: '', text: 'Long shelf life when stored in a cool & dry place' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'iran' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Dry Dates (Gold)' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 15W x 3.5H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Dry Dates Gold are a premium dried fruit that offers a naturally pleasant taste and satisfying chewy texture. Carefully selected for quality, these dry dates are a wholesome snack that can be enjoyed by people of all ages. They are easy to carry, ready to eat, and make a convenient addition to your daily routine.',
      'Dry dates are a versatile ingredient that can be enjoyed straight from the pack or used in a variety of recipes. They can be chopped into breakfast cereals, oats, yogurt, and smoothie bowls or added to homemade energy bars, laddoos, cookies, cakes, and traditional Indian sweets. Their naturally mild sweetness also makes them a great ingredient for festive recipes and healthy snack mixes.',
      'Whether you need a quick snack at home, during office hours, or while travelling, RTC Dry Dates Gold are a practical choice. They also fit perfectly into lunch boxes and are commonly enjoyed during fasting, festivals, and family gatherings. Their firm texture makes them easy to store and convenient to enjoy whenever you need a wholesome snack.',
      'If you are looking to buy premium dry dates online, RTC Foods offers carefully selected dry dates that are packed with care to preserve their freshness, taste, and quality. Every pack is prepared to deliver a consistently enjoyable experience, making them suitable for everyday use as well as special occasions.',
      'RTC Dry Dates Gold are a pantry essential for anyone who enjoys premium dried fruits. Whether you eat them as a snack or use them in your favourite recipes, they add natural goodness and delicious flavour to your daily meals.'
    ],
    nutrition: {
      'Energy': '282 kcal',
      'Fiber': '8g'
    },
    features: [
      '100% Natural Yellow Dry Dates',
      'Rich in Energy & Iron'
    ]
  },
  {
    id: 22,
    slug: 'black-raisins',
    name: 'Black Raisins',
    category: 'dry-fruits',
    categoryName: 'Raisins',
    price: 162,
    priceDisplay: '₹162.00',
    originalPrice: 162,
    badge: '',
    rating: 4.9,
    reviewsCount: 88,
    image: '/black_raisins_front.png',
    gallery: ['/black_raisins_front.png', '/black_raisins_back.png'],
    shortDesc: '10 in stock. Premium Afghanistan Origin: Sourced from high-quality Afghan farms known for rich, naturally sweet raisins.',
    description: 'RTC Black Raisins are a premium dried fruit loved for their naturally rich sweetness, soft texture, and delicious flavour. Carefully selected from quality harvests, these raisins are an excellent choice for everyday snacking and cooking.',
    weights: ['250gm'],
    productTypes: [],
    sku: 'RTC-RAI-BLK',
    stock: true,
    stockCount: 10,
    origin: 'Afganistain',
    shelfLife: '12 Months',
    bullets: [
      { title: '', text: 'Premium Afghanistan Origin: Sourced from high-quality Afghan farms known for rich, naturally sweet raisins.' },
      { title: '', text: 'Nutrient-Rich Snack: High in iron, fiber, and antioxidants for overall health support.' },
      { title: '', text: 'Supports Digestion: Natural fiber helps promote better gut health.' },
      { title: '', text: 'Energy Boosting: Provides quick and sustained energy throughout the day.' },
      { title: '', text: 'Soft & Juicy Texture: Plump, naturally sweet, and delicious in every bite.' },
      { title: '', text: 'Versatile Usage: Ideal for snacking, desserts, sweets, cereals, and traditional recipes.' },
      { title: '', text: '100% Natural: No added sugar, preservatives, or artificial additives.' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'Afganistain' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Black Raisins' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 15W x 3.5H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Manufacturing Date', value: '01/06/2026' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Black Raisins are a premium dried fruit loved for their naturally rich sweetness, soft texture, and delicious flavour. Carefully selected from quality harvests, these raisins are an excellent choice for everyday snacking and cooking. Their naturally sweet taste makes them a wholesome alternative to sugary snacks and an ingredient that can be enjoyed by the whole family.',
      'Black raisins are easy to include in your daily meals. Enjoy them straight from the pack or add them to breakfast cereals, oats, yogurt, smoothie bowls, and homemade granola. They are also widely used in cakes, cookies, muffins, breads, puddings, kheer, halwa, and festive sweets. Their rich flavour blends perfectly with dry fruits, nuts, and seeds, making them ideal for homemade trail mixes and healthy snack recipes.',
      'Whether you are packing lunch boxes, travelling, or preparing snacks for the family, RTC Black Raisins are a convenient option to keep close at hand. They are also commonly enjoyed during festivals, fasting, and special occasions, making them a versatile pantry essential for every home.',
      'If you are looking to buy premium black raisins online, RTC Foods offers carefully selected raisins that are packed with care to preserve their freshness, quality, and natural taste. Every pack is prepared to deliver a consistently enjoyable experience, whether you are snacking or creating your favourite recipes.',
      'RTC Black Raisins are a simple way to add premium dried fruits to your everyday routine. Their naturally sweet flavour and versatility make them an excellent choice for breakfast, desserts, baking, traditional recipes, and healthy snacking.'
    ],
    nutrition: {
      'Energy': '299 kcal',
      'Iron': '2.3 mg'
    },
    features: [
      '100% Sun-Dried Black Raisins',
      'Rich in Iron & Antioxidants'
    ]
  },
  {
    id: 7,
    slug: 'whole-cranberries-dried-gold',
    name: 'Whole Cranberries Dried (Gold)',
    category: 'dehydrated-fruits',
    categoryName: 'Dehydrated Fruits',
    price: 310,
    priceDisplay: '₹310.00',
    originalPrice: 310,
    badge: '',
    rating: 4.7,
    reviewsCount: 72,
    image: '/cranberries_gold_front.jpg',
    gallery: ['/cranberries_gold_front.jpg', '/cranberries_gold_back.png'],
    shortDesc: 'Premium quality whole dried cranberries sourced from the USA. Naturally sweet and tangy flavor with rich fruity taste.',
    description: 'Gold Grade Whole Dried Cranberries imported from the USA, carefully selected for vibrant color, soft chewiness, and rich fruity flavor.',
    weights: ['250gm'],
    productTypes: ['Gold'],
    sku: 'RTC-CRN-01',
    stock: true,
    origin: 'USA',
    shelfLife: '12 Months',
    bullets: [
      { title: '', text: 'Premium quality whole dried cranberries sourced from the USA' },
      { title: '', text: 'Naturally sweet and tangy flavor with rich fruity taste' },
      { title: '', text: 'Soft, chewy texture ideal for daily snacking' },
      { title: '', text: 'Perfect for cereals, oatmeal, salads, desserts, and baking' },
      { title: '', text: 'Rich source of antioxidants and dietary fiber' },
      { title: '', text: 'Convenient healthy snack for home, office, or travel' },
      { title: '', text: 'Hygienically packed to retain freshness and flavor' },
      { title: '', text: 'Suitable for smoothies, trail mixes, cookies, and cakes' },
      { title: '', text: 'Carefully selected berries with vibrant color and taste' },
      { title: '', text: 'No artificial flavor added' },
      { title: '', text: 'Resealable packaging for long-lasting freshness' },
      { title: '', text: 'Ideal for health-conscious consumers and gourmet recipes' }
    ],
    additionalInfoTable: [
      { label: 'Care Instructions', value: 'Lower temperature washes and delicate spin cycles are gentler on garment, helping to maintain the color, shape and structure of the fabric. At the same time it reduces energy consumption that is used in care processes.' },
      { label: 'Model wears', value: 'UK 10/ EU 38/ US 6' },
      { label: 'Occasion', value: 'Lifestyle, Sport' },
      { label: 'Country', value: 'Italy' },
      { label: 'Outer', value: 'Leather 100%, Polyamide 100%' },
      { label: 'Lining', value: 'Polyester 100%' },
      { label: 'CounSoletry', value: 'Rubber 100%' }
    ],
    paragraphs: [
      'Premium quality whole dried cranberries sourced from the USA, prepared to deliver a rich fruity flavor and pleasant sweet-tangy taste.',
      'Soft and chewy whole berries perfect for healthy daily snacking, breakfast bowls, baking, salad toppings, and trail mixes.'
    ],
    nutrition: {
      'Calories': '308 kcal',
      'Dietary Fiber': '5.7g',
      'Vitamin C': '45% DV'
    },
    features: [
      '100% Whole Cranberries from USA',
      'Rich in natural antioxidants & fiber',
      'No artificial colors or flavors added'
    ]
  },
  {
    id: 23,
    slug: 'exotic-dried-blueberries',
    name: 'Exotic Dried Blueberries',
    category: 'dehydrated-fruits',
    categoryName: 'Dehydrated Fruits',
    price: 405,
    priceDisplay: '₹405.00',
    originalPrice: 405,
    badge: '',
    rating: 4.9,
    reviewsCount: 96,
    image: '/dried_blueberries_front.png',
    gallery: ['/dried_blueberries_front.png', '/dried_blueberries_back.png'],
    shortDesc: '10 in stock. Premium exotic dried blueberries sourced from the USA. Naturally sweet and mildly tangy fruity flavor.',
    description: 'RTC Exotic Dried Blueberries are a delicious dried fruit that combines natural sweetness with a light fruity tang, making them a favourite for healthy snacking and everyday recipes.',
    weights: ['250gm'],
    productTypes: [],
    sku: 'RTC-BLU-01',
    stock: true,
    stockCount: 10,
    origin: 'Turkey',
    shelfLife: '12 Months',
    bullets: [
      { title: '', text: 'Premium exotic dried blueberries sourced from the USA' },
      { title: '', text: 'Naturally sweet and mildly tangy fruity flavor' },
      { title: '', text: 'Soft and chewy texture with rich blueberry taste' },
      { title: '', text: 'Perfect for snacking, baking, cereals, and desserts' },
      { title: '', text: 'Rich source of antioxidants and dietary fiber' },
      { title: '', text: 'Ideal for smoothies, yogurt bowls, and trail mixes' },
      { title: '', text: 'Carefully selected high-quality blueberries' },
      { title: '', text: 'Hygienically processed and packed for freshness' },
      { title: '', text: 'Convenient healthy snack for home, office, or travel' },
      { title: '', text: 'Adds delicious flavor to muffins, cookies, and salads' },
      { title: '', text: 'No artificial flavor added' },
      { title: '', text: 'Freshness-sealed packaging for long-lasting taste and quality' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'Turkey' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Exotic Dried Blueberries' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 13W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Exotic Dried Blueberries are a delicious dried fruit that combines natural sweetness with a light fruity tang, making them a favourite for healthy snacking and everyday recipes. Their soft and chewy texture makes them enjoyable straight from the pack while also adding colour, flavour, and texture to a wide variety of dishes.',
      'These dried blueberries are perfect for breakfast, desserts, and homemade snacks. Mix them into oats, granola, breakfast cereals, yogurt, or smoothie bowls for a naturally fruity taste. They are also a popular ingredient in cakes, muffins, cookies, pancakes, energy bars, chocolates, and other baked treats. Their sweet and tangy flavour blends beautifully with nuts, seeds, and other dried fruits to create delicious snack mixes.',
      'Whether you are at home, in the office, or travelling, RTC Exotic Dried Blueberries are an easy snack to carry and enjoy anytime. They are also a great addition to lunch boxes and make an excellent topping for ice cream, fruit salads, and festive desserts. Their vibrant flavour makes both everyday meals and special recipes more enjoyable.',
      'If you are looking to buy dried blueberries online, RTC Foods offers carefully selected premium blueberries that are packed to preserve their freshness, texture, and taste. Every pack is prepared with attention to quality, giving you a consistently enjoyable experience with every serving.',
      'RTC Exotic Dried Blueberries are a wonderful pantry essential for anyone who enjoys premium dried fruits. Whether you are baking, preparing breakfast, or looking for a naturally delicious snack, these dried blueberries bring rich flavour and premium quality to every bite.'
    ],
    nutrition: {
      'Energy': '343 kcal',
      'Dietary Fibre': '7.2g',
      'Protein': '1.4g'
    },
    features: [
      '100% USA Imported Blueberries',
      'Freshness Locked Double Layer Pouch'
    ]
  },
  {
    id: 24,
    slug: 'prunes',
    name: 'Prunes',
    category: 'dehydrated-fruits',
    categoryName: 'Dehydrated Fruits',
    price: 238,
    priceDisplay: '₹238.00',
    originalPrice: 238,
    badge: '',
    rating: 4.8,
    reviewsCount: 84,
    image: '/prunes_front.jpg',
    gallery: ['/prunes_front.jpg', '/prunes_back.png'],
    shortDesc: '10 in stock. Premium quality dried prunes sourced from the USA. Naturally sweet flavor with soft and juicy texture.',
    description: 'RTC Prunes are a delicious dried fruit that brings natural sweetness and a soft, enjoyable texture to your everyday diet. They are a simple and convenient snack that can be enjoyed anytime, whether you are at home, at work, or on the go.',
    weights: ['250gm'],
    productTypes: [],
    sku: 'RTC-PRU-01',
    stock: true,
    stockCount: 10,
    origin: 'India',
    shelfLife: '12 Months',
    bullets: [
      { title: '', text: 'Premium quality dried prunes sourced from the USA' },
      { title: '', text: 'Naturally sweet flavor with soft and juicy texture' },
      { title: '', text: 'Rich source of dietary fiber and antioxidants' },
      { title: '', text: 'Ideal healthy snack for everyday consumption' },
      { title: '', text: 'Perfect for smoothies, desserts, baking, and breakfast bowls' },
      { title: '', text: 'Helps add natural sweetness to recipes' },
      { title: '', text: 'Carefully selected fruits for consistent quality and taste' },
      { title: '', text: 'Hygienically processed and packed for freshness' },
      { title: '', text: 'Convenient snack option for home, office, or travel' },
      { title: '', text: 'Suitable for trail mixes, salads, and energy snacks' },
      { title: '', text: 'No artificial flavor added' },
      { title: '', text: 'Freshness-sealed packaging for long-lasting quality' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'India' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Prunes' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 13W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Prunes are a delicious dried fruit that brings natural sweetness and a soft, enjoyable texture to your everyday diet. They are a simple and convenient snack that can be enjoyed anytime, whether you are at home, at work, or on the go. Their naturally rich flavour makes them a great alternative to sugary snacks and processed treats.',
      'Prunes are a versatile ingredient that can be used in many recipes. Add them to oatmeal, yogurt, cereals, or homemade granola for a naturally sweet taste. They can also be chopped into cakes, cookies, muffins, and breads or blended into smoothies and shakes. Their soft texture makes them easy to mix into salads, energy bars, and trail mixes, giving your recipes extra flavour without the need for added sweeteners.',
      'Keeping prunes in your pantry gives you an easy ingredient for both everyday meals and special recipes. They are loved by families for their convenience and can be packed into lunch boxes, carried during travel, or enjoyed as a quick snack between meals. Their natural taste pairs well with a wide range of fruits, nuts, and breakfast foods.',
      'If you are looking to buy premium prunes online, RTC Foods offers carefully selected dried prunes that are packed with attention to quality and freshness. Every pack is prepared to deliver a consistently enjoyable taste and texture, making it easy to include this wholesome dried fruit in your daily routine.',
      'Whether you enjoy them on their own or use them in your favourite recipes, RTC Prunes are a smart addition to every kitchen. Their natural sweetness and versatility make them a convenient choice for healthy snacking, baking, and everyday cooking.'
    ],
    nutrition: {
      'Energy': '240 kcal',
      'Dietary Fibre': '7.1g',
      'Potassium': '732 mg'
    },
    features: [
      '100% Quality Dried Prunes',
      'Rich in Fiber & Antioxidants'
    ]
  },
  {
    id: 25,
    slug: 'ajino',
    name: 'Ajino',
    category: 'chemical-herbs',
    categoryName: 'Chemical & Herbs',
    price: 137,
    priceDisplay: '₹137.00',
    originalPrice: 137,
    badge: '',
    rating: 4.8,
    reviewsCount: 64,
    image: '/ajino_front.png',
    gallery: ['/ajino_front.png', '/ajino_back.png'],
    shortDesc: '10 in stock. Premium Quality Ajino – Sourced and processed in India. Enhances taste instantly.',
    description: 'RTC Ajino is a popular cooking ingredient that helps bring out the rich and savoury taste in a wide variety of dishes. Its fine crystal texture mixes easily with ingredients, making it a convenient choice for both home kitchens and professional cooking.',
    weights: ['500gm'],
    productTypes: [],
    sku: 'RTC-AJI-01',
    stock: true,
    stockCount: 10,
    origin: 'India',
    shelfLife: '12 Months',
    bullets: [
      { title: '', text: 'Premium Quality Ajino – Sourced and processed in India' },
      { title: '', text: 'Enhances Taste Instantly – Adds rich umami flavor to dishes' },
      { title: '', text: 'Perfect for Cooking – Ideal for Chinese, snacks & fast food' },
      { title: '', text: 'Fine Crystal Texture – Easy to mix and dissolve' },
      { title: '', text: 'Multipurpose Use – Suitable for soups, noodles, fried rice & more' },
      { title: '', text: 'Hygienically Packed – Ensures freshness and purity' },
      { title: '', text: 'Strong Flavor Booster – Elevates taste with small quantity' },
      { title: '', text: 'Consistent Quality – Trusted for everyday cooking' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'India' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Ajino' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 15W x 3.5H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Refer to the product' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Ajino is a popular cooking ingredient that helps bring out the rich and savoury taste in a wide variety of dishes. Its fine crystal texture mixes easily with ingredients, making it a convenient choice for both home kitchens and professional cooking. A small amount is enough to enhance the flavour of your favourite recipes.',
      'Ajino is widely used in Indo Chinese cooking and can be added to noodles, fried rice, soups, stir fried vegetables, pasta, momos, spring rolls, Manchurian, chilli paneer, chilli chicken, and many other dishes. It blends smoothly with seasonings and sauces to create a well balanced and delicious taste that people enjoy.',
      'Whether you are preparing a quick meal for your family or cooking for guests, RTC Ajino helps deliver consistent flavour in every recipe. It is suitable for everyday cooking and can be used in both vegetarian and non vegetarian dishes. Its easy to use nature makes it a useful ingredient for beginners as well as experienced cooks.',
      'If you are looking to buy Ajino online, RTC Foods offers a premium quality product that is carefully packed to maintain freshness and quality. Every pack is prepared with attention to high standards, giving you a reliable cooking ingredient for your kitchen.',
      'Keep RTC Ajino in your spice collection and enjoy preparing restaurant style dishes at home with ease. It is a simple way to enhance the flavour of your favourite recipes and create delicious meals for family and friends.'
    ],
    nutrition: {
      'Sodium': '12.2g',
      'Glutamate': '78%'
    },
    features: [
      'Pure Monosodium Glutamate',
      'Freshness Locked Multi-Layer Pouch'
    ]
  },
  {
    id: 26,
    slug: 'kasuri-methi',
    name: 'Kasuri Methi',
    category: 'chemical-herbs',
    categoryName: 'Chemical & Herbs',
    price: 300,
    priceDisplay: '₹300.00',
    originalPrice: 300,
    badge: '',
    rating: 4.9,
    reviewsCount: 78,
    image: '/kasuri_methi_front.jpg',
    gallery: ['/kasuri_methi_front.jpg'],
    shortDesc: '10 in stock. Sun-dried premium quality Kasuri Methi. Delivers authentic aroma and rich herbal taste.',
    description: 'RTC Kasuri Methi brings traditional Indian flavors to life. Carefully harvested and dried under hygienic conditions to preserve rich green color and aroma.',
    weights: ['100gm'],
    productTypes: [],
    sku: 'RTC-KAS-01',
    stock: true,
    stockCount: 10,
    origin: 'India',
    shelfLife: '12 Months',
    bullets: [
      { title: '', text: 'Sun-dried premium quality Kasuri Methi' },
      { title: '', text: 'Delivers authentic aroma and rich herbal taste' },
      { title: '', text: 'Perfect for parathas, paneer dishes, and curries' },
      { title: '', text: 'Hygienically packed to retain essential oils and aroma' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'India' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Kasuri Methi' },
      { label: 'Additive info', value: 'Refer to the product' },
      { label: 'Product Dimensions', value: '20L x 13W x 4H cm' },
      { label: 'Manufacturer or packer name', value: 'RTC Foods' },
      { label: 'Manufacturer or packer address', value: 'IN' },
      { label: 'Ingredients', value: 'Dried Fenugreek Leaves' },
      { label: 'contact details consumer care', value: 'RTC Foods, info@rtcfoods.in' }
    ],
    paragraphs: [
      'RTC Kasuri Methi brings traditional Indian flavors to life. Carefully harvested and dried under hygienic conditions to preserve rich green color and aroma.',
      'Crush gently between palms before sprinkling over curries, lentils, paneer gravies, or kneading into paratha dough for unmatched flavor.'
    ],
    nutrition: {
      'Protein': '4.4g',
      'Dietary Fibre': '24.6g'
    },
    features: [
      '100% Pure Dried Fenugreek Leaves',
      'Hygienically Packed for Freshness'
    ]
  }
];
