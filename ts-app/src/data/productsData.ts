import type { Product, Category } from '../types/product';

export const categories: Category[] = [
  {
    id: 'dry-fruits',
    name: 'Dry Fruits & Nuts',
    icon: 'Apple',
    desc: 'Handpicked jumbo cashews, almonds, walnuts & pistachios sourced directly from premium growers.'
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
    price: 274,
    priceDisplay: '₹274.00 – ₹1,082.00',
    originalPrice: 350,
    badge: 'New',
    rating: 4.9,
    reviewsCount: 128,
    image: '/california_almonds_pouch.png',
    gallery: ['/california_almonds_pouch.png', '/california_almonds_back.png'],
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
    originalPrice: 40,
    badge: 'Bestseller',
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
    categoryName: 'Cashew',
    price: 301,
    priceDisplay: '₹301.00',
    originalPrice: 380,
    badge: 'Pure Grade',
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
    categoryName: 'Dried Apricot',
    price: 123,
    priceDisplay: '₹123.00',
    originalPrice: 160,
    badge: 'Gold',
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
    originalPrice: 210,
    badge: 'Fresh',
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
    category: 'dry-fruits',
    categoryName: 'Dry Figs',
    price: 265,
    priceDisplay: '₹265.00',
    originalPrice: 340,
    badge: 'Popular',
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
    originalPrice: 220,
    badge: 'New',
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
    shortDesc: 'RTC Foods Walnut Kernals Diamond – Handpicked premium walnut kernels with rich taste, crunchy texture, and locked-in freshness.',
    description: 'RTC Foods Walnut Kernals Diamond are high quality walnut kernels known for their rich nutty taste, pale color, and crunchy texture. Packed under strict hygienic protocols.',
    weights: ['250g', '500g', '1kg'],
    sku: 'RTC-WAL-DMD',
    stock: true,
    origin: 'Chile',
    shelfLife: '9 Months',
    bullets: [
      { title: 'Diamond Grade Walnut Kernels', text: 'Carefully selected 2-piece walnut kernels with rich taste.' },
      { title: 'Omega-3 & Protein Rich', text: 'Supports brain health, heart health, and overall daily vitality.' },
      { title: 'Freshness Locked Packaging', text: 'Hygienically packed to retain freshness and natural flavor.' }
    ],
    additionalInfoTable: [
      { label: 'Country of origin', value: 'Chile' },
      { label: 'Brand', value: 'RTC FOODS' },
      { label: 'Common name', value: 'RTC Walnut Kernals Diamond' }
    ],
    paragraphs: [
      'RTC Foods Walnut Kernals Diamond are premium wholesome walnut kernels naturally packed to preserve rich taste and nutrition.'
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
    id: 7,
    slug: 'whole-cranberries-dried-gold',
    name: 'Whole Cranberries Dried (Gold)',
    category: 'dehydrated-fruits',
    categoryName: 'Dehydrated Fruits',
    price: 310,
    priceDisplay: '₹310.00',
    originalPrice: 390,
    badge: 'Popular',
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
  }
];
