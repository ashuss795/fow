const menuData = [
    {
        id: "m1",
        name: "Paneer Tikka",
        description: "Grilled cottage cheese marinated in spiced yogurt.",
        price: 350.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 30,
        image: "images/paneer_dish_1776277322775.png",
        nutrition: {
            calories: 391,
            protein: 38,
            carbs: 48,
            fats: 13
        },
        tags: []
    },
    {
        id: "m2",
        name: "Samosa Chaat",
        description: "Crushed samosas topped with yogurt, chutneys, and spices.",
        price: 150.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 8,
        image: "https://upload.wikimedia.org/wikipedia/commons/6/61/Samosa_Chaat.jpg",
        nutrition: {
            calories: 690,
            protein: 33,
            carbs: 69,
            fats: 27
        },
        tags: []
    },
    {
        id: "m3",
        name: "Aloo Tikki",
        description: "Crispy potato patties served with sweet and spicy chutneys.",
        price: 120.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 22,
        image: "images/aloo_gobi_1776277733256.png",
        nutrition: {
            calories: 431,
            protein: 34,
            carbs: 39,
            fats: 37
        },
        tags: []
    },
    {
        id: "m4",
        name: "Chicken Tikka",
        description: "Boneless chicken pieces baked using skewers in a clay oven.",
        price: 400.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 44,
        image: "images/chicken_tikka_1776277420132.png",
        nutrition: {
            calories: 614,
            protein: 31,
            carbs: 74,
            fats: 35
        },
        tags: []
    },
    {
        id: "m5",
        name: "Seekh Kebab",
        description: "Minced lamb kebabs cooked in tandoor.",
        price: 450.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 15,
        image: "images/seekh_kebab_1776277717092.png",
        nutrition: {
            calories: 701,
            protein: 29,
            carbs: 67,
            fats: 24
        },
        tags: []
    },
    {
        id: "m6",
        name: "Hara Bhara Kebab",
        description: "Vegetarian kebabs made with spinach, potatoes, and peas.",
        price: 250.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 9,
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Hara_Bhara_Kabab.JPG",
        nutrition: {
            calories: 546,
            protein: 38,
            carbs: 60,
            fats: 32
        },
        tags: []
    },
    {
        id: "m7",
        name: "Papdi Chaat",
        description: "Crisp fried dough wafers served with potatoes, chickpeas, and chutneys.",
        price: 140.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 14,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Papri_Pakori_Chat.JPG",
        nutrition: {
            calories: 710,
            protein: 8,
            carbs: 29,
            fats: 38
        },
        tags: []
    },
    {
        id: "m8",
        name: "Onion Bhaji",
        description: "Crispy onion fritters spiced with carom seeds and green chilies.",
        price: 180.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 25,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Bhaji_with_chutney.jpg",
        nutrition: {
            calories: 684,
            protein: 13,
            carbs: 63,
            fats: 26
        },
        tags: []
    },
    {
        id: "m9",
        name: "Fish Amritsari",
        description: "Spicy, crispy fried fish originating from Amritsar.",
        price: 500.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 22,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Amritsari_Fried_Fish-_Amritsar-Punjab_IMG_04.jpg",
        nutrition: {
            calories: 436,
            protein: 35,
            carbs: 67,
            fats: 35
        },
        tags: []
    },
    {
        id: "m10",
        name: "Prawn Koliwada",
        description: "Crispy fried prawns marinated in fiery spices.",
        price: 600.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 8,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Deep_fried_prawns_with_shells%2C_garlic_sauce%2C_ground_black_pepper.jpg",
        nutrition: {
            calories: 607,
            protein: 19,
            carbs: 71,
            fats: 13
        },
        tags: []
    },
    {
        id: "m11",
        name: "Gobi Manchurian",
        description: "Deep-fried cauliflower florets in a spicy soy-based gravy.",
        price: 280.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 35,
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Gobi_manchurian.jpg",
        nutrition: {
            calories: 370,
            protein: 14,
            carbs: 47,
            fats: 30
        },
        tags: []
    },
    {
        id: "m12",
        name: "Chilli Paneer",
        description: "Indo-Chinese style cottage cheese cubes tossed in spicy sauce.",
        price: 320.00,
        category: "starters",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 28,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/96/A_full_plate_chilli_paneer_in_Kolkata%2C_West_Bengal.jpg",
        nutrition: {
            calories: 630,
            protein: 23,
            carbs: 79,
            fats: 12
        },
        tags: []
    },
    {
        id: "m13",
        name: "Butter Chicken",
        description: "Classic creamy tomato curry with tender roasted chicken.",
        price: 550.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 27,
        image: "images/chicken_curry_1776277341477.png",
        nutrition: {
            calories: 412,
            protein: 11,
            carbs: 50,
            fats: 10
        },
        tags: []
    },
    {
        id: "m14",
        name: "Dal Makhani",
        description: "Slow-cooked black lentils in creamy tomato sauce.",
        price: 350.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 34,
        image: "images/dal_makhani_1776277683827.png",
        nutrition: {
            calories: 205,
            protein: 34,
            carbs: 75,
            fats: 28
        },
        tags: []
    },
    {
        id: "m15",
        name: "Palak Paneer",
        description: "Cubes of cottage cheese in a rich spinach curry.",
        price: 400.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 18,
        image: "images/palak_paneer_1776277751451.png",
        nutrition: {
            calories: 622,
            protein: 17,
            carbs: 56,
            fats: 13
        },
        tags: []
    },
    {
        id: "m16",
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with spiced chicken and saffron.",
        price: 650.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 34,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/23/A_home_made_plate_of_mutton_biryani_served_with_chicken_kassa_cooked_in_the_bengali_style.jpg",
        nutrition: {
            calories: 432,
            protein: 9,
            carbs: 77,
            fats: 13
        },
        tags: []
    },
    {
        id: "m17",
        name: "Mutton Rogan Josh",
        description: "Kashmiri style slow-cooked lamb in aromatic spices.",
        price: 750.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 13,
        image: "images/chicken_curry_1776277341477.png",
        nutrition: {
            calories: 652,
            protein: 11,
            carbs: 51,
            fats: 21
        },
        tags: []
    },
    {
        id: "m18",
        name: "Paneer Butter Masala",
        description: "Rich and creamy tomato gravy with cottage cheese cubes.",
        price: 420.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 20,
        image: "images/paneer_dish_1776277322775.png",
        nutrition: {
            calories: 415,
            protein: 22,
            carbs: 79,
            fats: 38
        },
        tags: []
    },
    {
        id: "m19",
        name: "Chana Masala",
        description: "Spicy chickpea curry cooked with tomatoes and onions.",
        price: 300.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 46,
        image: "images/dal_makhani_1776277683827.png",
        nutrition: {
            calories: 768,
            protein: 19,
            carbs: 58,
            fats: 14
        },
        tags: []
    },
    {
        id: "m20",
        name: "Malai Kofta",
        description: "Potato and paneer balls cooked in a creamy mild cashew gravy.",
        price: 450.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 24,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Malai_Kofta_Curry.jpg",
        nutrition: {
            calories: 608,
            protein: 8,
            carbs: 34,
            fats: 23
        },
        tags: []
    },
    {
        id: "m21",
        name: "Bhindi Masala",
        description: "Stir-fried okra with onions and tomatoes.",
        price: 320.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 45,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Bhindi_Masala.jpg",
        nutrition: {
            calories: 662,
            protein: 27,
            carbs: 77,
            fats: 21
        },
        tags: []
    },
    {
        id: "m22",
        name: "Aloo Gobi",
        description: "Classic potato and cauliflower curry.",
        price: 280.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 8,
        image: "images/aloo_gobi_1776277733256.png",
        nutrition: {
            calories: 565,
            protein: 29,
            carbs: 60,
            fats: 23
        },
        tags: []
    },
    {
        id: "m23",
        name: "Veg Kolhapuri",
        description: "Mixed vegetables in a fiery maharashtrian style gravy.",
        price: 350.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 41,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Mushroom_Biryani_and_Veg_Kolhapuri_at_Mayuri%2C_JP_Nagar%2C_Bangalore_%282025-09-20%29.jpg",
        nutrition: {
            calories: 588,
            protein: 28,
            carbs: 66,
            fats: 25
        },
        tags: []
    },
    {
        id: "m24",
        name: "Kadai Paneer",
        description: "Cottage cheese and bell peppers cooked in spicy tomato gravy.",
        price: 420.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 14,
        image: "images/paneer_dish_1776277322775.png",
        nutrition: {
            calories: 780,
            protein: 20,
            carbs: 66,
            fats: 38
        },
        tags: []
    },
    {
        id: "m25",
        name: "Fish Curry",
        description: "Coastal style fish curry with coconut and kokum.",
        price: 600.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 9,
        image: "images/fish_curry_1776277700342.png",
        nutrition: {
            calories: 683,
            protein: 40,
            carbs: 25,
            fats: 24
        },
        tags: []
    },
    {
        id: "m26",
        name: "Goan Prawn Curry",
        description: "Spicy and tangy prawn curry made with coconut milk.",
        price: 700.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 7,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/King_prawn_curry_-_Sunoso.jpg",
        nutrition: {
            calories: 680,
            protein: 30,
            carbs: 56,
            fats: 26
        },
        tags: []
    },
    {
        id: "m27",
        name: "Mutton Biryani",
        description: "Fragrant long grain rice cooked with tender marinated mutton.",
        price: 800.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 35,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/23/A_home_made_plate_of_mutton_biryani_served_with_chicken_kassa_cooked_in_the_bengali_style.jpg",
        nutrition: {
            calories: 309,
            protein: 16,
            carbs: 79,
            fats: 20
        },
        tags: []
    },
    {
        id: "m28",
        name: "Veg Biryani",
        description: "Aromatic rice and mixed vegetables cooked with whole spices.",
        price: 450.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 28,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Vegetable_Biryani_IMG_001.jpg",
        nutrition: {
            calories: 370,
            protein: 35,
            carbs: 64,
            fats: 40
        },
        tags: []
    },
    {
        id: "m29",
        name: "Garlic Naan",
        description: "Leavened flatbread topped with minced garlic and butter.",
        price: 90.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 46,
        image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Garlic_Butter_Naan_Food_by_Ms_Ujwala_Kasambe_DSCN1136_%283%29.jpg",
        nutrition: {
            calories: 275,
            protein: 13,
            carbs: 62,
            fats: 40
        },
        tags: []
    },
    {
        id: "m30",
        name: "Butter Naan",
        description: "Soft leavened flatbread brushed with butter.",
        price: 70.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 46,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Butter_Naan_With_Paneer_Butter_Masala.jpg",
        nutrition: {
            calories: 203,
            protein: 21,
            carbs: 23,
            fats: 11
        },
        tags: []
    },
    {
        id: "m31",
        name: "Tandoori Roti",
        description: "Whole wheat flatbread baked in a tandoor.",
        price: 40.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 48,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Tandoori-roti.jpg",
        nutrition: {
            calories: 458,
            protein: 21,
            carbs: 49,
            fats: 37
        },
        tags: []
    },
    {
        id: "m32",
        name: "Lachha Paratha",
        description: "Flaky, layered whole wheat flatbread.",
        price: 80.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 20,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Lachha-paratha.jpg",
        nutrition: {
            calories: 359,
            protein: 19,
            carbs: 30,
            fats: 34
        },
        tags: []
    },
    {
        id: "m33",
        name: "Cheese Naan",
        description: "Naan stuffed with processed cheese and baked.",
        price: 120.00,
        category: "mains",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 48,
        image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Cheese_naan_and_Curry_03.jpg",
        nutrition: {
            calories: 614,
            protein: 12,
            carbs: 55,
            fats: 20
        },
        tags: []
    },
    {
        id: "m34",
        name: "Gulab Jamun",
        description: "Fried milk solids balls soaked in a sweet sugar syrup.",
        price: 150.00,
        category: "desserts",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 28,
        image: "images/indian_dessert_1776277390152.png",
        nutrition: {
            calories: 300,
            protein: 36,
            carbs: 72,
            fats: 18
        },
        tags: []
    },
    {
        id: "m35",
        name: "Rasmalai",
        description: "Soft cottage cheese discs in thickened sweetened milk.",
        price: 200.00,
        category: "desserts",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 40,
        image: "images/rasmalai_1776277766153.png",
        nutrition: {
            calories: 236,
            protein: 33,
            carbs: 51,
            fats: 19
        },
        tags: []
    },
    {
        id: "m36",
        name: "Gajar Ka Halwa",
        description: "Traditional carrot pudding made with milk and nuts.",
        price: 180.00,
        category: "desserts",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 28,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Delicious_Gajar_Ka_Halwa.jpg",
        nutrition: {
            calories: 274,
            protein: 17,
            carbs: 28,
            fats: 22
        },
        tags: []
    },
    {
        id: "m37",
        name: "Kheer",
        description: "Creamy rice pudding cardamom and saffron.",
        price: 160.00,
        category: "desserts",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 50,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Kheer.jpg",
        nutrition: {
            calories: 796,
            protein: 39,
            carbs: 33,
            fats: 21
        },
        tags: []
    },
    {
        id: "m38",
        name: "Kulfi Falooda",
        description: "Indian ice cream served with vermicelli noodles and rose syrup.",
        price: 220.00,
        category: "desserts",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 32,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Falooda_at_kulfi_house.jpg",
        nutrition: {
            calories: 745,
            protein: 17,
            carbs: 24,
            fats: 23
        },
        tags: []
    },
    {
        id: "m39",
        name: "Jalebi",
        description: "Crispy fried batter soaked in sugar syrup.",
        price: 120.00,
        category: "desserts",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 39,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Jalebi_1.jpg",
        nutrition: {
            calories: 562,
            protein: 15,
            carbs: 57,
            fats: 29
        },
        tags: []
    },
    {
        id: "m40",
        name: "Moong Dal Halwa",
        description: "Rich, ghee-laden dessert made from split green gram.",
        price: 200.00,
        category: "desserts",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 49,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Moong_Dal_Halwa_-_Ramandeep.JPG",
        nutrition: {
            calories: 790,
            protein: 30,
            carbs: 39,
            fats: 33
        },
        tags: []
    },
    {
        id: "m41",
        name: "Besan Ladoo",
        description: "Sweet roasted gram flour balls with nuts.",
        price: 140.00,
        category: "desserts",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 44,
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Besan_Laddu_cropped.jpg",
        nutrition: {
            calories: 245,
            protein: 13,
            carbs: 24,
            fats: 30
        },
        tags: []
    },
    {
        id: "m42",
        name: "Shahi Tukda",
        description: "Fried bread soaked in saffron milk and topped with nuts.",
        price: 250.00,
        category: "desserts",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 9,
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Food-Shahi-Tukra-2.jpg",
        nutrition: {
            calories: 736,
            protein: 8,
            carbs: 34,
            fats: 13
        },
        tags: []
    },
    {
        id: "m43",
        name: "Mango Lassi",
        description: "Sweet yogurt drink blended with ripe mangoes.",
        price: 150.00,
        category: "drinks",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 17,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Lassi_de_mango.JPG",
        nutrition: {
            calories: 278,
            protein: 10,
            carbs: 20,
            fats: 11
        },
        tags: []
    },
    {
        id: "m44",
        name: "Masala Chai",
        description: "Strong Indian tea brewed with aromatic spices.",
        price: 80.00,
        category: "drinks",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 23,
        image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Masala_Chiya.jpg",
        nutrition: {
            calories: 275,
            protein: 8,
            carbs: 55,
            fats: 40
        },
        tags: []
    },
    {
        id: "m45",
        name: "Sweet Lassi",
        description: "Classic sweet blended yogurt drink.",
        price: 120.00,
        category: "drinks",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 32,
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Lassi%28sweet%29.JPG",
        nutrition: {
            calories: 345,
            protein: 11,
            carbs: 52,
            fats: 40
        },
        tags: []
    },
    {
        id: "m46",
        name: "Jal Jeera",
        description: "Refreshing cumin and tamarind flavored drink.",
        price: 90.00,
        category: "drinks",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 49,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Two_Indian_Drinks.jpg",
        nutrition: {
            calories: 558,
            protein: 26,
            carbs: 42,
            fats: 22
        },
        tags: []
    },
    {
        id: "m47",
        name: "Fresh Lime Soda",
        description: "Classic fizzy lime drink, served sweet or salted.",
        price: 100.00,
        category: "drinks",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 40,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Mojito_made_with_rum%2C_lime%2C_sugar%2C_mint%2C_club_soda%2C_served_in_a_tall_glass_-_Evan_Swigart.jpg",
        nutrition: {
            calories: 498,
            protein: 14,
            carbs: 22,
            fats: 12
        },
        tags: []
    },
    {
        id: "m48",
        name: "Thandai",
        description: "Cold milk drink flavored with almonds, fennel, and rose petals.",
        price: 180.00,
        category: "drinks",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 28,
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Bhang-and-Thandai.jpg",
        nutrition: {
            calories: 203,
            protein: 7,
            carbs: 30,
            fats: 35
        },
        tags: []
    },
    {
        id: "m49",
        name: "Filter Coffee",
        description: "South Indian style strong milky coffee.",
        price: 120.00,
        category: "drinks",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 26,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/10/GKN_Filter_Coffee_DSC_1038.JPG",
        nutrition: {
            calories: 502,
            protein: 14,
            carbs: 77,
            fats: 16
        },
        tags: []
    },
    {
        id: "m50",
        name: "Rose Sherbet",
        description: "Sweet rose-flavored mocktail.",
        price: 110.00,
        category: "drinks",
        timeSlots: ["breakfast", "lunch", "dinner"],
        stock: 12,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/RaspberrySherbet.jpg",
        nutrition: {
            calories: 562,
            protein: 32,
            carbs: 73,
            fats: 27
        },
        tags: []
    }
];

// Simple recommendation rules based on category or item ID
const recommendationRules = {
    m1: ["m13", "m40"], 
    m13: ["m29", "m40"], 
    default: ["m40"]  
};

// Dynamically calculate MRP and tags
menuData.forEach(item => {
    const randomMultiplier = 1.2 + (Math.random() * 0.15);
    item.mrp = Math.ceil((item.price * randomMultiplier) / 10) * 10;
    const discountPercent = Math.round(((item.mrp - item.price) / item.mrp) * 100);
    if (!item.tags) item.tags = [];
    item.tags.push(`${discountPercent}% OFF`);
    if (Math.random() > 0.7) item.tags.push("Best Seller");
    else if (Math.random() < 0.2) item.tags.push("Limited Offer");
});
