// Master list of menu items. Hand-edited — add/remove items here directly,
// or regenerate this file via admin.html (a local-only editing tool, not
// linked from the public site). id must stay unique.
const MP_ITEMS = [
  {
    "id": "yong-tau-foo-bee-tai-mak",
    "name": "Yong Tau Foo Bee Tai Mak",
    "tags": [
      "asian",
      "noodles",
      "dinner-friendly",
      "low-calories",
      "quick"
    ],
    "dishType": "one-dish",
    "subType": "yong-tau-foo",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "beef-and-beef-tendon-bee-hoon-soup",
    "name": "Beef and Beef Tendon Bee Hoon Soup",
    "tags": [
      "asian",
      "noodles",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "beef",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "prawn-noodles",
    "name": "Prawn Noodles",
    "tags": [
      "asian",
      "noodles",
      "seafood",
      "lunch-friendly",
      "dinner-friendly",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "seafood-noodle",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "lor-mee",
    "name": "Lor Mee",
    "tags": [
      "asian",
      "noodles",
      "dinner-friendly",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "pork",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "fish-slice-bee-hoon",
    "name": "Fish Slice Bee Hoon",
    "tags": [
      "asian",
      "noodles",
      "seafood",
      "lunch-friendly",
      "dinner-friendly",
      "low-calories",
      "quick",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "fish",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "kuay-teow-soup-minced-meat-seafood-fish",
    "name": "Kuay Teow Soup",
    "tags": [
      "asian",
      "noodles",
      "seafood",
      "lunch-friendly",
      "dinner-friendly",
      "low-calories",
      "quick",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "kuay-teow",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "mee-sua-soup",
    "name": "Mee Sua Soup",
    "tags": [
      "asian",
      "noodles",
      "lunch-friendly",
      "dinner-friendly",
      "low-calories",
      "quick",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "udon-in-dashi-soup",
    "name": "Udon in Dashi Soup",
    "tags": [
      "japanese",
      "noodles",
      "lunch-friendly",
      "dinner-friendly",
      "low-calories",
      "quick",
      "less-processed",
      "asian"
    ],
    "dishType": "one-dish",
    "subType": "udon",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "macaroni-soup",
    "name": "Macaroni Soup",
    "tags": [
      "noodles",
      "lunch-friendly",
      "dinner-friendly",
      "quick",
      "less-processed",
      "asian",
      "low-calories"
    ],
    "dishType": "one-dish",
    "subType": "macaroni",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "ipoh-hor-fun",
    "name": "Ipoh Hor Fun",
    "tags": [
      "asian",
      "noodles",
      "lunch-friendly",
      "dinner-friendly",
      "quick",
      "less-processed",
      "low-calories"
    ],
    "dishType": "one-dish",
    "subType": "hor-fun",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "300g cooked chicken breast meat, shredded",
        "500g Ipoh hor fun",
        "200g chye sim, cut into 2-inch sections and blanched",
        "200g bean sprouts, blanched",
        "50g dried Chinese mushrooms, stems removed, sliced",
        "Sauce: 1 tbsp light soy sauce, 1 tsp dark soy sauce, 2 tbsp oyster sauce, 1 tsp sesame oil, 2 tsp sugar, 3 cups fresh chicken stock, 2 tsp corn flour"
      ],
      "steps": [
        "Bring sauce ingredients to a boil in a pot and add mushrooms. Reduce heat and simmer for 30 minutes until mushrooms are tender.",
        "Blanch hor fun in boiling water for a few seconds. Transfer to serving bowls.",
        "Arrange shredded chicken, chye sim, and bean sprouts on top of the hor fun, then ladle sauce over."
      ]
    }
  },
  {
    "id": "seafood-white-bee-hoon",
    "name": "Seafood White Bee Hoon",
    "tags": [
      "asian",
      "noodles",
      "seafood",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "seafood-noodle",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "beef-soup-kuay-teow",
    "name": "Beef Soup Kuay Teow",
    "tags": [
      "asian",
      "noodles",
      "lunch-friendly",
      "dinner-friendly",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "beef",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "vegetarian-bolognese-macaroni-pasta",
    "name": "Vegetarian Bolognese Macaroni/Pasta",
    "tags": [
      "western",
      "quick",
      "lunch-friendly",
      "dinner-friendly",
      "meatless"
    ],
    "dishType": "one-dish",
    "subType": "vegetarian-pasta",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "fried-kuay-teow",
    "name": "Fried Kuay Teow",
    "tags": [
      "asian",
      "quick",
      "lunch-friendly",
      "dinner-friendly",
      "seafood"
    ],
    "dishType": "one-dish",
    "subType": "kuay-teow",
    "isRiceBased": true,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "3 tbsp healthier oil",
        "1 tsp garlic, minced",
        "3 prawns, deshelled and cleaned",
        "25g lower-sodium fish cake, sliced into strips",
        "1 cup cabbage, shredded",
        "50g bean sprouts",
        "2 eggs, beaten",
        "200g wholegrain hor fun or kway teow (flat noodles)",
        "1 1/2 tbsp healthier fish sauce",
        "1 tbsp lower-sodium soy sauce",
        "1 tbsp healthier dark soy sauce",
        "1 tbsp Chinese chives, chopped"
      ],
      "steps": [
        "In a hot wok, heat healthier oil. Stir-fry the prawns, fish cake, and garlic until cooked and fragrant. Set aside.",
        "With the remaining oil in the wok, stir-fry the cabbage and bean sprouts quickly. Remove the cooked vegetables from the heat and set aside.",
        "Heat the rest of the healthier oil and fry the eggs until they are scrambled. Add the noodles and toss together in the wok with the healthier fish sauce, lower-sodium soy sauce, and healthier dark soy sauce.",
        "Add Chinese chives with all the other ingredients. Stir-fry to heat through. Serve hot."
      ]
    }
  },
  {
    "id": "wanton-mee-dry-soup-with-char-siew-chicken-fishball-soup",
    "name": "Wanton Mee (Dry/Soup) with Char Siew Chicken",
    "tags": [
      "asian",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "soy-sauce-chicken-noodles",
    "name": "Soy Sauce Chicken Noodles",
    "tags": [
      "asian",
      "lunch-friendly",
      "dinner-friendly",
      "quick",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "200g egg noodles",
        "3-4 stalks chye sim (or favorite leafy vegetable), blanched",
        "1 tsp sesame oil, for serving",
        "1 tsp sambal or chilli oil (optional, for serving)",
        "Sliced green scallions, for garnish",
        "Braising liquid & chicken: 1 tsp vegetable oil, 3-4 garlic cloves (smashed), 1-inch ginger (sliced), 2 spring onions (white root portion), 1 cinnamon stick, 1 star anise, 2 dried bay leaves (optional), 500ml chicken stock, 3 tbsp light soy sauce, 2 tbsp dark soy sauce, 1 tbsp brown sugar, 500g boneless chicken thighs, 1/4 tsp salt (optional)"
      ],
      "steps": [
        "Heat oil in a saucepan or pot. Add garlic, ginger, spring onion roots, cinnamon, and star anise; stir-fry until fragrant.",
        "Pour in chicken stock, light soy sauce, dark soy sauce, brown sugar, and bay leaves (if using). Stir and bring to a boil.",
        "Add chicken thighs, bring back to a boil, then lower heat to a gentle simmer. Cover and cook until chicken is fully cooked through.",
        "Remove chicken from the braising liquid and slice.",
        "Blanch noodles and vegetables according to packet instructions (blanch fresh noodles for 2-3 minutes to retain bounce).",
        "To assemble each serving bowl, add 3-4 tablespoons of the braising liquid, sesame oil, and sambal/chilli oil (if using). Add noodles and toss to coat.",
        "Top with sliced chicken, blanched greens, and garnish with sliced green scallions. Serve immediately."
      ]
    }
  },
  {
    "id": "fried-bee-hoon-stewed-pork-cabbage",
    "name": "Fried Bee Hoon (Stewed Pork/Cabbage)",
    "tags": [
      "asian",
      "quick",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "pork",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "hokkien-mee",
    "name": "Hokkien Mee",
    "tags": [
      "asian",
      "seafood",
      "dinner-friendly",
      "noodles",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "seafood-noodle",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "Prawns and squid",
        "Prawn heads (for stock)",
        "1.5L chicken stock",
        "Cooking oil",
        "Chopped garlic",
        "5 eggs",
        "Yellow noodles",
        "1 tbsp fish sauce",
        "Pepper (to taste)",
        "Sesame oil",
        "Chives"
      ],
      "steps": [
        "Fry prawn heads in a pot, add 1.5L chicken stock, and boil for 30 minutes to create prawn stock.",
        "Boil prawns and squid, then set aside.",
        "Heat oil in a wok. Fry chopped garlic, add 5 eggs, and scramble.",
        "Add yellow noodles and stir-fry on high heat for a few minutes.",
        "Add 1/3 of the prawn stock, 1 tbsp fish sauce, pepper, and sesame oil. Fry until the stock is almost dry.",
        "Add another 1/3 of the prawn stock, cover, and let simmer for 5-7 minutes.",
        "Add the cooked prawns, squid, and chives, then stir-fry.",
        "Add the remaining 1/3 prawn stock and stir-fry for 1 minute before serving."
      ]
    }
  },
  {
    "id": "fried-rice-luncheon-meat-egg-tomato-sauce",
    "name": "Fried Rice (Luncheon Meat/Egg/Tomato Sauce)",
    "tags": [
      "asian",
      "quick",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "pork",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "salmon-fried-rice",
    "name": "Salmon Fried Rice",
    "tags": [
      "asian",
      "seafood",
      "quick",
      "lunch-friendly",
      "dinner-friendly",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "salmon",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "mee-goreng",
    "name": "Mee Goreng",
    "tags": [
      "asian",
      "spicy",
      "quick",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "mee-goreng",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "200g Asian yellow noodles",
        "Protein of choice (e.g., fried tau kee or fish meat wrapped in dried beancurd skin)",
        "Veggies of choice (e.g., yau mak chye and bok choy)",
        "2 tbsp water",
        "2 tbsp cooking oil",
        "2 cloves garlic, chopped",
        "2 tbsp dried chilli paste",
        "Sauce bowl: 1 tbsp oyster sauce, 1 tbsp dark sweet soya sauce (kicap manis), 1 tbsp tomato ketchup"
      ],
      "steps": [
        "Mix together all ingredients for the sauce bowl.",
        "Heat oil in a pan over medium heat. Add dried chilli paste and garlic. Saute until the chilli paste turns a darker hue and the oil splits.",
        "Add protein of choice and cook through.",
        "Add noodles and pour in the sauce bowl mixture. Stir-fry thoroughly to combine.",
        "Add vegetables and stir-fry until they wilt. Serve immediately."
      ]
    }
  },
  {
    "id": "spaghetti-bolognese",
    "name": "Spaghetti Bolognese",
    "tags": [
      "western",
      "italian",
      "lunch-friendly",
      "dinner-friendly",
      "quick"
    ],
    "dishType": "one-dish",
    "subType": "beef",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "carbonara-spaghetti-macaroni",
    "name": "Carbonara Spaghetti/Macaroni",
    "tags": [
      "western",
      "italian",
      "lunch-friendly",
      "dinner-friendly",
      "noodles",
      "quick",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "pork",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "lobster-bisque-spaghetti",
    "name": "Lobster Bisque Spaghetti",
    "tags": [
      "western",
      "italian",
      "seafood",
      "dinner-friendly",
      "noodles",
      "lunch-friendly"
    ],
    "dishType": "one-dish",
    "subType": "seafood-pasta",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "mac-and-cheese",
    "name": "Mac and Cheese",
    "tags": [
      "western",
      "quick",
      "lunch-friendly",
      "dinner-friendly",
      "meatless"
    ],
    "dishType": "one-dish",
    "subType": "cheese-pasta",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "aglio-olio-spaghetti-with-prawns",
    "name": "Aglio Olio Spaghetti with Prawns",
    "tags": [
      "western",
      "italian",
      "seafood",
      "quick",
      "lunch-friendly",
      "dinner-friendly",
      "noodles",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "seafood-pasta",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "ravioli-with-pesto",
    "name": "Ravioli with Pesto",
    "tags": [
      "western",
      "italian",
      "dinner-friendly",
      "meatless"
    ],
    "dishType": "one-dish",
    "subType": "cheese-pasta",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "smoked-duck-carbonara",
    "name": "Smoked Duck Carbonara",
    "tags": [
      "western",
      "italian",
      "dinner-friendly",
      "quick",
      "lunch-friendly"
    ],
    "dishType": "one-dish",
    "subType": "duck",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "120g spaghetti",
        "100g smoked duck, sliced into thin strips",
        "2-3 tbsp reserved pasta water",
        "100ml fresh cream",
        "3 tbsp grated cheese (parmesan/cheddar)",
        "Small knob of butter",
        "1/2 tbsp chopped garlic",
        "Salt and pepper"
      ],
      "steps": [
        "Cook pasta in salted water with a bit of oil. Drain and reserve a few tablespoons of pasta water.",
        "Heat pan to medium heat and fry the smoked duck strips for several minutes until browned and crispy. Set duck aside, leaving oil in pan.",
        "Melt butter in the remaining pan oil and fry chopped garlic until browned.",
        "Add fresh cream and stir. Thicken sauce with grated cheese and season with salt and pepper. Add reserved pasta water if too thick, then turn off heat.",
        "Toss cooked noodles and smoked duck evenly in the sauce and serve."
      ]
    }
  },
  {
    "id": "beef-lasagne",
    "name": "Beef Lasagne",
    "tags": [
      "western",
      "italian",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "beef",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "rainbow-salad",
    "name": "Rainbow Salad",
    "tags": [
      "low-calories",
      "quick",
      "lunch-friendly",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "salad",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "japanese-curry-rice-rice-cake",
    "name": "Japanese Curry (Rice/Rice Cake)",
    "tags": [
      "japanese",
      "lunch-friendly",
      "dinner-friendly",
      "quick"
    ],
    "dishType": "one-dish",
    "subType": "curry",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "budae-jjigae",
    "name": "Budae Jjigae",
    "tags": [
      "korean",
      "spicy",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "budae-jjigae",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "hotpot",
    "name": "Hotpot",
    "tags": [
      "asian",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "hotpot",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "Seafood: Prawns, Sotong, Salmon, Sutchi fish, Batang fish",
        "Tofu / Egg Tofu",
        "Napa cabbage",
        "Straw mushrooms, Button mushrooms",
        "Fishballs, Fish dumplings, Fuzhou Fishballs",
        "Meatballs",
        "Crabstick",
        "Meat: Pork slices, chicken meat"
      ]
    }
  },
  {
    "id": "gimbap-sushi",
    "name": "Gimbap / Sushi",
    "tags": [
      "korean",
      "lunch-friendly",
      "less-processed",
      "asian"
    ],
    "dishType": "one-dish",
    "subType": "gimbap",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "toast-pizzas",
    "name": "Toast Pizzas",
    "tags": [
      "western",
      "lunch-friendly",
      "dinner-friendly",
      "italian"
    ],
    "dishType": "one-dish",
    "subType": "toast-pizza",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "white-brown-rice",
    "name": "White/Brown Rice",
    "tags": [
      "quick",
      "meatless",
      "less-processed",
      "asian",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "rice-plain",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "porridge-plain",
    "name": "Porridge (Plain)",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "meatless",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "porridge",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "porridge-chicken",
    "name": "Porridge (Chicken)",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "lunch-friendly",
      "low-calories"
    ],
    "dishType": "one-dish",
    "subType": "porridge",
    "isRiceBased": true,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "Brown rice 180g",
        "Ginger 4 slices",
        "Garlic 4 cloves",
        "Chicken thigh (or drumstick) 150g",
        "Sesame oil 1 tsp",
        "Carrots 50g",
        "Napa cabbage 50g",
        "Shimeji mushrooms 50g",
        "Spring onion, chopped, 2 stalks",
        "Water 10 cups",
        "Salt & pepper, to taste"
      ],
      "steps": [
        "Place the rice, garlic, ginger and water in a rice cooker and cook until the rice is soft.",
        "Add the chicken. Simmer for 30 minutes, then add the carrots and Shimeji mushrooms. Let simmer for 1 hour. Stir occasionally.",
        "Mix in the seasoning and napa cabbage.",
        "Remove the chicken and shred it. Add the shredded meat (without the bones) to the porridge.",
        "Simmer for another 15-20 minutes. Garnish with spring onions."
      ]
    }
  },
  {
    "id": "porridge-century-egg",
    "name": "Porridge (Century Egg)",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "meatless",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "porridge",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "porridge-salmon",
    "name": "Porridge (Salmon)",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "seafood",
      "lunch-friendly"
    ],
    "dishType": "one-dish",
    "subType": "porridge",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "fried-man-tou",
    "name": "Fried Man Tou (Buns)",
    "tags": [
      "asian",
      "meatless"
    ],
    "dishType": "component",
    "subType": "mantou",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "toast-sourdough-bread",
    "name": "Toast Sourdough Bread",
    "tags": [
      "western",
      "meatless",
      "less-processed"
    ],
    "dishType": "component",
    "subType": "bread",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "boiled-sweet-potato",
    "name": "Boiled Sweet Potato",
    "tags": [
      "low-calories",
      "quick",
      "meatless",
      "less-processed"
    ],
    "dishType": "component",
    "subType": "sweet-potato",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "honey-baked-chicken-wings",
    "name": "Honey Baked Chicken Wings",
    "tags": [
      "asian",
      "dinner-friendly",
      "less-processed",
      "match-with-rice",
      "match-with-noodles"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "toast-baked-chicken-marinated-lemon-pepper-cajun",
    "name": "Toast/Baked Chicken (Marinated/Lemon Pepper/Cajun)",
    "tags": [
      "western",
      "dinner-friendly",
      "quick",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "asian",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "marinated chicken"
      ],
      "steps": [
        "Bake in toaster oven"
      ]
    }
  },
  {
    "id": "sesame-oil-chicken",
    "name": "Sesame Oil Chicken",
    "tags": [
      "asian",
      "dinner-friendly",
      "quick",
      "lunch-friendly",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "2 tablespoons sesame oil",
        "5 cm ginger knob, peeled and cut into thin strips",
        "350 g chicken, cut into pieces",
        "2 tablespoons soy sauce",
        "1 tablespoon Shaoxing wine , or Chinese rice wine",
        "3 dashes ground white pepper",
        "120 ml water"
      ],
      "steps": [
        "Heat a skillet or wok over high heat and add the sesame oil. Once hot, add the ginger strips and stir-fry until they turn light brown and fragrant.",
        "Add the chicken and stir-fry for 10–15 seconds. Then pour in the soy sauce, Shaoxing wine, and a few dashes of ground white pepper. Add the water and give everything a quick stir to combine.",
        "Cover the skillet or wok, reduce the heat to low, and let the chicken simmer for about 10 minutes, or until the sauce thickens and the chicken is tender. Serve immediately."
      ]
    }
  },
  {
    "id": "soy-sauce-chicken-dark-sauce-chicken-wings",
    "name": "Soy Sauce Chicken/Dark Sauce Chicken Wings",
    "tags": [
      "asian",
      "dinner-friendly",
      "less-processed",
      "match-with-rice",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "teriyaki-chicken-wings",
    "name": "Teriyaki Chicken Wings",
    "tags": [
      "japanese",
      "dinner-friendly",
      "quick",
      "less-processed",
      "match-with-rice",
      "asian",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "6 chicken wings",
        "1/4 tsp salt",
        "1/2 tbsp light soy sauce",
        "1/2 tbsp white wine",
        "1 stalk spring onion",
        "2 pips garlic, bruised",
        "2 tbsp mirin",
        "2 tbsp light soy sauce",
        "1 tbsp white wine",
        "1 tbsp honey"
      ],
      "steps": [
        "Mix the salt, light soy sauce, and white wine well. Marinate the chicken wings in the refrigerator for 3 hours.",
        "Heat oil in a pan and pan-fry the marinated chicken wings until fragrant.",
        "Add the spring onion and bruised garlic and reduce heat to medium-low. Continue pan-frying until aromatic.",
        "Pour in the mirin, light soy sauce, white wine, and honey mixture and pan-fry until the sauce thickens and all flavors combine."
      ]
    }
  },
  {
    "id": "pan-fried-chicken-with-sauce",
    "name": "Pan Fried Chicken with Sauce",
    "tags": [
      "asian",
      "quick",
      "dinner-friendly",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "stewed-duck-wings-with-tau-kwa-eggs",
    "name": "Stewed Duck Wings (with Tau Kwa/Eggs)",
    "tags": [
      "asian",
      "dinner-friendly",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "duck",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "8 fresh duck wings",
        "6 hardboiled eggs",
        "10 dried mushrooms, softened",
        "1 firm beancurd, cubed",
        "Stew sauce: 1 bulb garlic, 6 slices blue ginger, 2 star anise, 1 cinnamon stick, 2 sticks rock sugar, 3 stalks spring onion, 3 tbsp hua tiao jiu, 1 tsp white pepper, 125ml light soy sauce, 2 tbsp dark soy sauce, 5 cups water"
      ],
      "steps": [
        "Clean duck wings and remove feather tips.",
        "Place all Stew Sauce ingredients in a pot. Cover and boil for 15 minutes.",
        "Add duck wings and stir to mix. Bring to a boil, cover partially, and simmer for 30 minutes.",
        "Add eggs, mushrooms, and beancurd. Simmer for 5 minutes.",
        "Turn off heat, cover, and let steep briefly before serving."
      ]
    }
  },
  {
    "id": "seaweed-chicken",
    "name": "Seaweed Chicken",
    "tags": [
      "asian",
      "quick",
      "dinner-friendly",
      "match-with-rice",
      "match-with-noodles",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "abc-soup-potato-carrot-onion-tomatoes",
    "name": "ABC Soup (Potato, Carrot, Onion, Tomatoes)",
    "tags": [
      "asian",
      "meatless",
      "less-processed",
      "match-with-rice",
      "low-calories",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "soup-abc",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "bak-kut-teh",
    "name": "Bak Kut Teh",
    "tags": [
      "asian",
      "dinner-friendly",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "soup-pork-rib",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "radish-and-carrot-pork-rib-soup-with-red-dates",
    "name": "Radish and Carrot Pork Rib Soup with Red Dates",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "soup-pork-rib",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "sweet-corn-and-carrot-pork-rib-soup",
    "name": "Sweet Corn and Carrot Pork Rib Soup",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "soup-pork-rib",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "ginseng-chicken-soup",
    "name": "Ginseng Chicken Soup",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "soup-chicken",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "lotus-root-with-peanuts-and-pork-ribs-soup",
    "name": "Lotus Root with Peanuts and Pork Ribs Soup",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "soup-pork-rib",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "salted-veg-duck-wing-pork-rib-soup",
    "name": "Salted Veg Duck Wing/Pork Rib Soup",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "soup-pork-rib",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "nonya-fish-maw-soup-with-fishballs",
    "name": "Nonya Fish Maw Soup with Fishballs",
    "tags": [
      "asian",
      "seafood",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "soup-seafood",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "miso-soup-with-salmon-tofu-kelp",
    "name": "Miso Soup (with Salmon/Tofu/Kelp)",
    "tags": [
      "japanese",
      "quick",
      "match-with-rice",
      "asian",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "soup-miso",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "seaweed-egg-drop-soup",
    "name": "Seaweed Egg Drop Soup",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "soup-egg-drop",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "5g dried seaweed",
        "4 cups chicken stock (or vegetable stock, 950ml)",
        "1 cup water (235ml)",
        "5g dried shrimp flakes (optional)",
        "1/4-1/2 teaspoon sesame oil",
        "1/4 teaspoon white pepper",
        "2 eggs, beaten",
        "1 scallion, thinly sliced"
      ],
      "steps": [
        "Toast the dried seaweed in a dry wok over medium heat for 1-2 minutes per side. Remove and set aside.",
        "Add stock and water to a pot/wok and bring to a boil. Add the dried shrimp flakes (if using), sesame oil, white pepper, and toasted seaweed. Bring to a boil again.",
        "Stir in the beaten eggs, followed by the scallions. Bring to a boil once more and serve immediately."
      ]
    }
  },
  {
    "id": "tofu-and-napa-cabbage-soup",
    "name": "Tofu and Napa Cabbage Soup",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "low-calories",
      "meatless",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "soup-tofu",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "4 cups chicken stock (or vegetable stock)",
        "3 cups water",
        "2 tbsp neutral oil (canola, vegetable, or avocado)",
        "3 large eggs",
        "450g soft or silken tofu (1 block, cut into 1/2-inch cubes)",
        "85g fresh mushrooms (button, cremini, beech, oyster, or shiitake), sliced or torn",
        "340g napa cabbage, sliced into 3/4-inch pieces",
        "1 tsp sesame oil",
        "Salt, to taste",
        "1/2 tsp white pepper",
        "1/4 cup chopped cilantro leaves and/or scallions"
      ],
      "steps": [
        "Bring stock and water to a boil in a pot. Once boiling, cover and reduce heat to keep simmering.",
        "Heat oil in a separate large pot or wok over medium-high heat. Crack in the eggs and cook until well-browned around the edges. Flip and fully cook the yolks through.",
        "Transfer fried eggs to a cutting board, cut into bite-size pieces, and return them to the pot.",
        "Turn heat to high and pour in the simmering stock/water mixture along with the tofu and mushrooms. Cover and boil over high heat for 10 minutes.",
        "Stir in the napa cabbage, cover, and cook for another 5-10 minutes until tender.",
        "Stir in sesame oil, salt to taste, and white pepper. Garnish with cilantro and/or scallions, then serve."
      ]
    }
  },
  {
    "id": "3-egg-spinach-fish-soup",
    "name": "3-Egg Spinach Fish Soup",
    "tags": [
      "asian",
      "seafood",
      "less-processed",
      "match-with-rice",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "soup-fish",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "Fish & marinade: 300g sliced fish (mackerel, grouper, or snapper), 1/2 tsp salt, white pepper, 1/2 tbsp corn flour",
        "Soup base: 500ml chicken stock + 200ml water, 4 cloves garlic (halved), 3 cloves garlic (minced), 3 slices young ginger, 200g round leaf spinach",
        "The three eggs: 1 salted egg (boiled, cooked, and minced), 1 century egg (peeled and chopped), 1 egg (beaten)",
        "Optional: 1 tbsp Shaoxing wine"
      ],
      "steps": [
        "Marinate fish: gently mix the sliced fish with salt and white pepper. Coat with corn flour.",
        "Aromatics: heat oil over medium heat. Fry the halved garlic and ginger until lightly browned. Add the minced garlic and fry until fragrant.",
        "Boil soup: pour in the chicken stock and water. Add the minced salted egg and century egg. Cover and bring to a boil.",
        "Vegetables: add the spinach and increase the heat to medium-high until the soup returns to a boil.",
        "Cook fish: carefully add the marinated fish slices. Cook until the fish turns opaque and white.",
        "Finishing touches: drizzle the beaten egg over the soup. Add a splash of Shaoxing wine if desired. Taste and adjust seasoning as needed."
      ]
    }
  },
  {
    "id": "spinach-tofu-soup",
    "name": "Spinach Tofu Soup",
    "tags": [
      "asian",
      "meatless",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "soup-tofu",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "300g spinach",
        "1 box tofu, cut into 1-inch cubes",
        "1 carrot, cut into slices",
        "200g lean pork, sliced",
        "1.2 litre ikan bilis stock",
        "1 tsp oil",
        "Marinade: 1 Tbsp oyster sauce, 1/4 tsp white pepper, 2 tsp cornstarch, 1 Tbsp water",
        "Seasoning: 1 tsp salt, 1 tsp chicken bouillon powder, 1 tsp fish sauce, 1 tsp sesame oil"
      ],
      "steps": [
        "Marinate pork slices with the marinade; set aside.",
        "Heat oil in a pot. Add carrots and pork, stir-fry until pork is lightly cooked.",
        "Pour in ikan bilis stock, bring to a boil.",
        "Add tofu and spinach stems; simmer until stems are tender.",
        "Add spinach leaves.",
        "Stir in seasoning mixture.",
        "Turn off heat and serve."
      ]
    }
  },
  {
    "id": "cauliflower-cheese",
    "name": "Cauliflower Cheese Soup",
    "tags": [
      "western",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "soup-cauliflower",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "1 medium head cauliflower, broken into florets",
        "1 carrot, shredded",
        "25g celery, chopped into small pieces",
        "590ml water",
        "2 teaspoons chicken bouillon",
        "3 tablespoons butter",
        "3 tablespoons all-purpose flour",
        "3/4 teaspoon salt",
        "1/8 teaspoon pepper",
        "473ml milk",
        "113g shredded cheddar cheese"
      ],
      "steps": [
        "In a heavy-bottomed pot, combine the cauliflower florets, shredded carrots, and celery. Add water and chicken bouillon, then bring to a boil. Reduce the heat to medium and let the mixture simmer for 10 to 15 minutes, or until the vegetables are tender.",
        "Meanwhile, prepare the cheesy soup base in a separate saucepan. Melt the butter, then stir in the all-purpose flour, salt, and pepper until well combined. Gradually add the milk, stirring constantly. Continue cooking over medium heat, stirring for about 2 minutes, or until the mixture thickens and is free of lumps.",
        "Add the shredded cheddar cheese to the milk mixture and stir until the cheese is fully melted.",
        "Pour the cheese mixture into the vegetable soup and stir to combine well. Garnish with freshly chopped parsley and a sprinkle of chili powder, if desired. Serve immediately."
      ]
    }
  },
  {
    "id": "stir-fry-vegetables",
    "name": "Stir-Fry Vegetables",
    "tags": [
      "asian",
      "quick",
      "low-calories",
      "meatless",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "vegetable-stirfry",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "boiled-broccoli",
    "name": "Broccoli",
    "tags": [
      "quick",
      "low-calories",
      "meatless",
      "less-processed",
      "match-with-rice",
      "asian",
      "western",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "vegetable-broccoli",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "stir-fry-beansprouts-with-salted-fish",
    "name": "Stir-Fry Beansprouts (with Salted Fish)",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "dinner-friendly",
      "meatless",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "vegetable-beansprouts",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "bittergourd-with-egg",
    "name": "Bittergourd with Egg",
    "tags": [
      "asian",
      "lunch-friendly",
      "quick",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "vegetable-bittergourd",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "bittergourd-with-fried-dace",
    "name": "Bittergourd with Fried Dace",
    "tags": [
      "asian",
      "seafood",
      "lunch-friendly",
      "quick",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "vegetable-bittergourd",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "1 can dace in fermented black beans, broken into small pieces",
        "1 bitter gourd, seeded, pith removed and sliced",
        "1 tbsp minced garlic",
        "Seasoning: 1 tsp sugar (or to taste)"
      ],
      "steps": [
        "Heat 1 tbsp oil in a pan.",
        "Sauté the garlic until fragrant.",
        "Add the dace in fermented black beans and stir-fry briefly.",
        "Add the sliced bitter gourd and continue stir-frying until tender-crisp.",
        "Season with sugar to taste before serving."
      ]
    }
  },
  {
    "id": "spinach-with-century-egg",
    "name": "Spinach with Century Egg",
    "tags": [
      "asian",
      "quick",
      "low-calories",
      "meatless",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "vegetable-spinach",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "potato-with-minced-meat-chicken",
    "name": "Potato with Minced Meat/Chicken",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "lunch-friendly",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "vegetable-potato",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "sambal-stir-fried-kangkong",
    "name": "Stir-Fried Kangkong",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "match-with-rice",
      "meatless",
      "lunch-friendly",
      "dinner-friendly",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "vegetable-kangkong",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "stir-fried-brinjal",
    "name": "Stir Fried Brinjal",
    "tags": [
      "asian",
      "meatless",
      "less-processed",
      "match-with-rice",
      "match-with-noodles"
    ],
    "dishType": "component",
    "subType": "vegetable-brinjal",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "pumpkin-with-minced-meat",
    "name": "Pumpkin with Minced Meat",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "vegetable-pumpkin",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "fried-tofu-with-bonito",
    "name": "Fried Tofu with Bonito",
    "tags": [
      "asian",
      "meatless",
      "less-processed",
      "match-with-rice",
      "low-calories",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "tofu",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "tofu-with-minced-chicken-meat",
    "name": "Tofu with Minced Chicken/Meat",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "dinner-friendly",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "tofu",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "steamed-tofu-with-bawang-goreng",
    "name": "Steamed Tofu with Bawang Goreng",
    "tags": [
      "asian",
      "quick",
      "meatless",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "tofu",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "cold-tofu-with-shimeiji-mushrooms",
    "name": "Cold Tofu with Shimeiji Mushrooms",
    "tags": [
      "japanese",
      "quick",
      "meatless",
      "less-processed",
      "match-with-rice",
      "asian",
      "low-calories",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "tofu",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "braised-egg-tofu-with-dual-mushrooms",
    "name": "Braised Egg Tofu with Dual Mushrooms",
    "tags": [
      "asian",
      "quick",
      "meatless",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "noodles",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "tofu",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "2 blocks egg tofu, sliced into 1cm thick rounds",
        "1 can straw mushrooms",
        "1 can button mushrooms",
        "2 cloves garlic, minced",
        "1 inch ginger, thinly sliced or minced",
        "2 tablespoons vegetable oil",
        "1 tablespoon cornstarch mixed with 2 tablespoons water (slurry)",
        "1 tablespoon sesame oil, for finishing",
        "2 stalks green onions, chopped, for garnish",
        "Sauce: 3 tablespoons soy sauce, 1 tablespoon oyster sauce, 1 teaspoon sugar, 1/2 teaspoon white pepper, 1 cup water"
      ],
      "steps": [
        "Gently pat the egg tofu slices dry with a paper towel. Pan-fry the tofu slices for 2-3 minutes per side until golden brown. Remove and set aside.",
        "Add oil to the pan. Add minced garlic and ginger, sauteing for 30 seconds until fragrant.",
        "Add the button and straw mushrooms. Saute for 3-5 minutes until they begin to soften and release moisture.",
        "Pour sauce mixture over the mushrooms and bring to a simmer.",
        "Carefully add the pan-fried egg tofu back into the pan among the mushrooms and sauce. Let it simmer gently for a few minutes.",
        "Restir the cornstarch slurry, then slowly pour into the sauce while stirring constantly. Cook for 1-2 minutes until thickened.",
        "Remove from heat, drizzle with sesame oil, and garnish with chopped green onions."
      ]
    }
  },
  {
    "id": "steamed-egg",
    "name": "Steamed Egg",
    "tags": [
      "asian",
      "quick",
      "meatless",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "dinner-friendly",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "egg",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "fried-egg-cai-po-egg-preserved-turnip",
    "name": "Fried Egg/Cai Po Egg (Preserved Turnip)",
    "tags": [
      "asian",
      "quick",
      "meatless",
      "match-with-rice",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "egg",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "50g preserved turnip / salted radish (chai po)",
        "1 tbsp cooking oil",
        "2 eggs, beaten",
        "5 garlic cloves, minced",
        "1 tbsp chopped spring onions"
      ],
      "steps": [
        "Wash and rinse the preserved turnip in two rounds of water. Squeeze out excess water, pat dry with paper towels, and let air dry for about 30 minutes.",
        "Heat oil in a wok and stir-fry minced garlic for 30 seconds. Add the preserved turnip and stir-fry for 2 minutes. Arrange into a flat layer using a spatula.",
        "Pour beaten eggs over the preserved turnip. Gently tilt the wok so all the turnip is coated. Cook for a few minutes until dry and lightly browned, then flip to cook the other side. Garnish with chopped spring onions."
      ]
    }
  },
  {
    "id": "scrambled-eggs-with-prawns",
    "name": "Scrambled Eggs with Prawns",
    "tags": [
      "asian",
      "seafood",
      "quick",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "egg",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "ramen-eggs",
    "name": "Ramen Eggs",
    "tags": [
      "japanese",
      "meatless",
      "less-processed",
      "match-with-rice",
      "low-calories",
      "dinner-friendly",
      "asian"
    ],
    "dishType": "component",
    "subType": "egg",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "steamed-triple-egg",
    "name": "Steamed Triple Egg",
    "tags": [
      "asian",
      "quick",
      "meatless",
      "match-with-rice",
      "low-calories",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "egg",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "airfry-ngoh-hiang",
    "name": "Airfry Ngoh Hiang",
    "tags": [
      "asian",
      "seafood",
      "quick",
      "match-with-rice",
      "match-with-noodles"
    ],
    "dishType": "component",
    "subType": "ngoh-hiang",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "sotong-balls",
    "name": "Sotong Balls",
    "tags": [
      "asian",
      "seafood",
      "quick",
      "match-with-rice",
      "match-with-noodles",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "sotong-balls",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "steamed-salmon",
    "name": "Steamed Salmon",
    "tags": [
      "seafood",
      "low-calories",
      "quick",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "asian",
      "japanese",
      "western",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "salmon",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "baked-salmon",
    "name": "Baked Salmon with Herbs",
    "tags": [
      "seafood",
      "low-calories",
      "quick",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "asian",
      "japanese",
      "western",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "salmon",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "fried-salmon",
    "name": "Pan Fried Salmon",
    "tags": [
      "seafood",
      "low-calories",
      "quick",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "asian",
      "japanese",
      "western",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "salmon",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "steamed-seabass",
    "name": "Steamed Seabass",
    "tags": [
      "asian",
      "seafood",
      "low-calories",
      "quick",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "seabass",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "ginger-soy-halibut-batang-fish",
    "name": "Ginger Soy Halibut/Batang Fish",
    "tags": [
      "asian",
      "seafood",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "fish",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "350g halibut fish fillet",
        "1 tablespoon cornflour",
        "2-inch (5cm) ginger, sliced into thin strips",
        "2 tablespoons cooking oil",
        "1 tablespoon chopped scallions",
        "Sauce: 2 tablespoons soy sauce, 2 tablespoons water, 1 tablespoon sugar, 1 teaspoon sesame oil, 3 dashes ground white pepper"
      ],
      "steps": [
        "Marinate fish with cornflour.",
        "Prepare the sauce.",
        "Heat pan and add oil until hot. Fry ginger, then set aside.",
        "Add fish to pan to fry.",
        "Add the sauce to the fish. Once the sauce starts to bubble, turn off the heat.",
        "Top with the ginger strips and scallions."
      ]
    }
  },
  {
    "id": "fried-pomfret-black-pomfret",
    "name": "Fried Pomfret/Black Pomfret",
    "tags": [
      "asian",
      "seafood",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "fish",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "400g black pomfret",
        "1/4 tsp salt",
        "2 - 2 1/2 tbsp corn flour",
        "8 tbsp oil for frying",
        "Optional for serving: belacan chilli, lime"
      ],
      "steps": [
        "Wash the pomfret and use a sharp knife to make diagonal criss-cross cuts across the body 1-inch apart to form a diamond shape. Pat the fish dry inside and out using a kitchen towel.",
        "Rub 1/4 tsp salt on the fish skin and the inside of the fish. Coat the whole fish generously with corn flour on both sides, ensuring it gets inside the diagonal grooves.",
        "Heat the oil in a wok over high heat.",
        "When the oil is boiling, shake off extra flour from the fish and place it in the oil to fry for about 3-4 minutes.",
        "Turn the fish over and fry for another 3-4 minutes.",
        "Remove and place on a kitchen towel to absorb excess oil. Transfer to a serving dish and serve hot."
      ]
    }
  },
  {
    "id": "fish-fingers-nuggets",
    "name": "Fish Fingers/Nuggets",
    "tags": [
      "western",
      "seafood",
      "quick",
      "match-with-rice",
      "match-with-noodles",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "fish",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "octopus-with-dark-sauce",
    "name": "Octopus with Dark Sauce",
    "tags": [
      "asian",
      "seafood",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "octopus",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "fried-shishamo",
    "name": "Fried Shishamo",
    "tags": [
      "japanese",
      "seafood",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "asian",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "fish",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "oven-baked-unagi",
    "name": "Oven Baked Unagi",
    "tags": [
      "japanese",
      "seafood",
      "quick",
      "match-with-rice",
      "asian",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "unagi",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "canned-sardines-mackerel",
    "name": "Canned Sardines/Mackerel",
    "tags": [
      "seafood",
      "quick",
      "match-with-rice",
      "asian",
      "lunch-friendly",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "fish",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "korean-seafood-pancake",
    "name": "Korean Seafood Pancake",
    "tags": [
      "korean",
      "seafood",
      "quick",
      "less-processed",
      "asian",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "seafood-pancake",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "toast-breaded-prawns",
    "name": "Toast Breaded Prawns",
    "tags": [
      "western",
      "seafood",
      "quick",
      "match-with-noodles",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "seafood-breaded",
    "isRiceBased": false,
    "isCarbohydrate": true
  },
  {
    "id": "steamed-tofu-with-egg-and-prawns",
    "name": "Steamed Tofu with Egg and Prawns",
    "tags": [
      "asian",
      "seafood",
      "less-processed",
      "match-with-rice",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "tofu",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "Egg mixture: 1 large egg (50-60g), 90ml water, 1/2 tsp chicken bouillon (or 1/3 tsp salt)",
        "Base: soft tofu (patted dry and sliced)",
        "Topping: 100g prawns (approx. 8 pieces), peeled and deveined",
        "Prawn marinade: 1/2 tbsp cornstarch",
        "Sauce: 2 tbsp light soy sauce, 2 tbsp hot water, 1/2 tsp sugar",
        "Garnish: chopped spring onions"
      ],
      "steps": [
        "Prepare egg: whisk the egg, water, and bouillon together. Strain the mixture through a fine colander over the dried tofu slices in a steaming dish.",
        "First steam: cover the dish with a lid or heat-safe plate to prevent water droplets from creating craters. Steam on medium-low heat for 12-14 minutes.",
        "Prep prawns & sauce: while steaming, coat prawns in cornstarch. Mix the soy sauce, hot water, and sugar for the dressing.",
        "Second steam: place the prawns on top of the semi-set egg. Cover and steam for another 1-2 minutes until the prawns are cooked through.",
        "Finish: turn off the heat. Drizzle the sauce over the dish and garnish with spring onions."
      ]
    }
  },
  {
    "id": "vegetarian-fried-bee-hoon",
    "name": "Vegetarian Fried Bee Hoon",
    "tags": [
      "asian",
      "quick",
      "lunch-friendly",
      "dinner-friendly",
      "meatless",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "vegetarian-noodle",
    "isRiceBased": true,
    "isCarbohydrate": true
  },
  {
    "id": "kimchi-pancake",
    "name": "Kimchi Pancake",
    "tags": [
      "korean",
      "meatless",
      "asian",
      "match-with-rice",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "kimchi-pancake",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "canned-peanuts",
    "name": "Canned Peanuts",
    "tags": [
      "quick",
      "meatless",
      "match-with-rice",
      "asian",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "peanuts",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "baked-oyster-mushroom",
    "name": "Baked Oyster Mushroom",
    "tags": [
      "quick",
      "meatless",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "asian",
      "lunch-friendly",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "vegetable-mushroom",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "grilled-chicken-with-mushroom-salsa",
    "name": "Grilled Chicken with Mushroom Salsa",
    "tags": [
      "western",
      "low-calories",
      "quick",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "Chicken breast, 400g",
        "Rice flour, 2 tbsp",
        "Salt, 1/2 tsp",
        "Spinach, fresh, 100g",
        "Mushrooms, fresh, 80g",
        "Olive oil, 1 1/2 tbsp",
        "Spring onion, finely chopped, 40g",
        "White wine, 1/4 cup"
      ],
      "steps": [
        "Marinate chicken with salt.",
        "Coat chicken breast in flour and then grill in a non-stick pan with half of the olive oil.",
        "Remove and set aside.",
        "In another pan, saute mushrooms in the remaining olive oil. Add wine and let evaporate. Add spinach and cook for 5 minutes.",
        "Add mushroom and spinach sauce on top of chicken and garnish with spring onion."
      ]
    }
  },
  {
    "id": "spaghetti-with-creamy-mushroom-sauce",
    "name": "Spaghetti with Creamy Mushroom Sauce",
    "tags": [
      "western",
      "italian",
      "quick",
      "less-processed",
      "lunch-friendly"
    ],
    "dishType": "one-dish",
    "subType": "mushroom-pasta",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "Spaghetti, 300g",
        "Salt, 1/2 tsp",
        "Olive oil (for tossing), 1 tsp",
        "Olive oil (for pan-frying), 4 tsp",
        "Garlic, minced, 5g",
        "Onion, chopped, 20g",
        "Canned mushrooms, sliced, 160g",
        "Chicken stock, 200ml",
        "Cream, 80ml",
        "Pepper, to taste",
        "Parmesan cheese, shaved, 2 tsp"
      ],
      "steps": [
        "Blanch spaghetti for 10 seconds and rinse under cold water for 3 minutes. Toss with olive oil to prevent sticking.",
        "In a pre-heated pan, add olive oil, then onion and garlic. Saute till fragrant.",
        "Add mushrooms and cook for 1 minute under high heat.",
        "Add chicken stock, cream, and salt, then lower heat. Add cooked spaghetti and toss.",
        "Garnish with parmesan cheese for additional taste and flavour."
      ]
    }
  },
  {
    "id": "soy-butter-glazed-king-oyster-mushroom",
    "name": "Soy Butter Glazed King Oyster Mushroom",
    "tags": [
      "asian",
      "low-calories",
      "quick",
      "meatless",
      "less-processed",
      "match-with-rice",
      "match-with-noodles",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "vegetable-mushroom",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "30g unsalted butter, melted",
        "15ml light soy sauce",
        "1/4 tsp dark soy sauce",
        "1/2 tsp honey",
        "1 clove garlic",
        "1/4 tsp black pepper",
        "450g king oyster mushrooms",
        "30ml vegetable oil",
        "Spring onion"
      ],
      "steps": [
        "Mix melted butter with light soy sauce, dark soy sauce, honey, garlic, and black pepper. Set aside.",
        "Slice the mushrooms lengthwise into 1/4-inch thick slices.",
        "Add oil to pan. Add the first batch of mushrooms in a single layer, leaving space so the mushrooms fry rather than steam.",
        "Pan-fry for about 5 minutes per side, until golden brown. Set aside.",
        "Repeat for the rest of the mushrooms.",
        "Add all the cooked mushrooms back to the pan, pour in the sauce and immediately turn off the heat. Mix.",
        "Garnish with spring onion."
      ]
    }
  },
  {
    "id": "kolo-mee",
    "name": "Kolo Mee",
    "tags": [
      "asian",
      "lunch-friendly",
      "dinner-friendly",
      "quick",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "pork",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "Kolo mee noodles, approx. 150g each",
        "250g minced meat",
        "200g char siew slices",
        "100g bean sprouts",
        "100g xiao bai cai",
        "Marinade: 3/4 tsp light soy sauce, 3/4 tsp sesame oil, 1 tsp cornstarch, dash of white pepper",
        "Sauce (for cooking pork): 1 tsp dark soy sauce, 1 tbsp sugar",
        "Sauce (for 1 serving of noodles): 1/2 tsp fish sauce, 1/2 tsp light soy sauce, 1/2 tsp oyster sauce, 1/2 tsp vinegar, 1 tbsp garlic/shallot oil, 1 dash flat fish powder",
        "Garnish: chopped spring onion, fried shallots"
      ],
      "steps": [
        "Marinate minced pork.",
        "Heat oil in a pan, stir-fry pork, then add dark soy sauce and sugar until cooked.",
        "Mix all sauce ingredients in each serving bowl.",
        "Blanch xiao bai cai in boiling water; set aside.",
        "Blanch noodles until semi-soft, dip in room temperature water, then blanch again briefly with bean sprouts.",
        "Drain noodles well and toss in the serving bowls with the sauce.",
        "Top with vegetables, char siew, minced pork, and garnish."
      ]
    }
  },
  {
    "id": "chicken-broccoli",
    "name": "Chicken Broccoli",
    "tags": [
      "asian",
      "quick",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "1/2 lb chicken breast, cut into cubes",
        "1/2 tablespoon cornstarch",
        "1 pinch salt",
        "1/2 lb broccoli florets",
        "2 tablespoons oil",
        "3 cloves garlic, minced",
        "Sauce: 1 tablespoon soy sauce, 1 tablespoon oyster sauce, 1/2 teaspoon sesame oil, 1 teaspoon sugar, 1 teaspoon cornstarch, 1/2 cup water, 3 dashes ground white pepper"
      ],
      "steps": [
        "Marinate the chicken with cornstarch and salt. If the chicken is too dry, add a little water to ensure each piece is nicely coated with the cornstarch.",
        "Heat up a pot of water and bring it to a boil. Cook the broccoli for 1 minute, then drain and set aside.",
        "Heat up a wok or skillet on high heat and add the oil. Once the oil is heated, add the garlic and stir-fry until aromatic or lightly browned. Add the chicken and give it a few quick stirs. Then, add the sauce and reduce the heat to low.",
        "When the chicken is cooked through, add the broccoli and stir to combine well. Dish out and serve immediately."
      ]
    }
  },
  {
    "id": "air-fryer-chicken-wings",
    "name": "Air Fryer Chicken Wings",
    "tags": [
      "asian",
      "dinner-friendly",
      "less-processed",
      "match-with-rice",
      "match-with-noodles"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "350g chicken wings",
        "1/2 tablespoon minced ginger",
        "2 cloves garlic or 1 tablespoon minced garlic",
        "1 1/2 tablespoons soy sauce",
        "1/2 tablespoon oyster sauce",
        "1/4 teaspoon five spice powder",
        "3 dashes cayenne pepper",
        "1 tablespoon honey",
        "1/2 tablespoon sesame oil",
        "Olive oil or vegetable oil, for brushing"
      ],
      "steps": [
        "In a bowl, mix the chicken wings with all the ingredients (except the brushing oil) until well coated. Marinate for at least 30 minutes.",
        "Place the marinated chicken wings in the air fryer basket in a single layer. Spoon any remaining marinade over the wings. Air fry at 375F (190C) for 6 minutes.",
        "Brush a little oil on the surface of the wings, then air fry again at 375F (190C) for 4 more minutes until golden and cooked through.",
        "Serve as is or with dipping sauce."
      ]
    }
  },
  {
    "id": "black-pepper-beef",
    "name": "Black Pepper Beef",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "beef",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "200g beef (flank, sirloin, ribeye, rump, or tenderloin), thinly sliced against the grain",
        "1 tbsp cooking oil",
        "4 thin slices ginger",
        "1/2 onion, roughly sliced",
        "1/2 bell pepper (mix of green, red, yellow), sliced into bite-sized pieces",
        "1 stalk celery, sliced thinly and diagonally",
        "Marinade 1: 1 tbsp black peppercorns, 1 tsp white peppercorns (or substitute with black peppercorns)",
        "Marinade 2 (seasonings): 2 tbsp oyster sauce, 1 tsp light soy sauce, 1 tbsp sesame oil, 1 tsp cornstarch, 1/2 tsp honey"
      ],
      "steps": [
        "Grind or blend Marinade 1 (black and white peppercorns) to a powder with coarse bits. Combine the pepper powder, sliced beef, and Marinade 2 seasonings in a bowl. Marinate for at least 15 minutes.",
        "Heat oil in a wok. Stir-fry the ginger, celery, and onions until the onions are soft and translucent.",
        "Add bell peppers and stir-fry for 1 minute, or until just cooked.",
        "Add the marinated beef and stir-fry briskly until just cooked."
      ]
    }
  },
  {
    "id": "chicken-soft-tofu-casserole",
    "name": "Chicken & Soft Tofu Casserole",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "Chicken & marinade: 225g boneless skinless chicken thighs (diced into 1-inch pieces), 15ml water, 1 tsp cornstarch, 1 tsp vegetable oil, 1 tsp oyster sauce",
        "4 medium dried shiitake mushrooms, soaked in 475ml hot water for 2+ hours, stems trimmed, thinly sliced",
        "450g soft tofu, cut into 3/4 inch cubes",
        "7g cornstarch mixed with 30ml water (slurry)",
        "235ml low-sodium chicken stock",
        "1/2 tsp sugar",
        "23ml oyster sauce",
        "15ml light soy sauce",
        "1/2 tsp dark soy sauce",
        "1/2 tsp sesame oil",
        "45ml vegetable oil, divided",
        "2 slices ginger",
        "2 scallions, sliced into 2-inch lengths, white and green parts separated",
        "3 cloves garlic, sliced",
        "15ml Shaoxing wine",
        "45g frozen peas",
        "1 pinch salt, or to taste"
      ],
      "steps": [
        "Mix diced chicken, 1 tbsp water, 1 tsp cornstarch, 1 tsp oil, and 1 tsp oyster sauce. Set aside.",
        "Create sauce mixture by combining chicken stock, sugar, oyster sauce, light soy sauce, dark soy sauce, and sesame oil.",
        "Heat wok over medium-high heat with 1 tbsp oil. Stir-fry chicken until opaque (about 1 minute), then set aside.",
        "Heat 2 tbsp oil over medium heat. Add ginger and white parts of scallions; cook for 30 seconds. Add garlic; cook for another 30 seconds.",
        "Increase heat to high, add Shaoxing wine and sliced mushrooms. Stir-fry for 1 minute.",
        "Pour in the sauce mixture and bring to a simmer. Stir and stream in the cornstarch slurry until thickened.",
        "Carefully add the drained tofu cubes and the cooked chicken, folding gently into the sauce.",
        "Transfer to a clay pot or Dutch oven (or keep in wok). Top with green scallions, cover, and simmer over medium heat for 8 minutes.",
        "Stir in frozen peas and salt. Simmer for 30-60 seconds to heat through, then serve."
      ]
    }
  },
  {
    "id": "spaghetti-with-mussels",
    "name": "Spaghetti with Mussels",
    "tags": [
      "western",
      "italian",
      "seafood",
      "less-processed",
      "lunch-friendly"
    ],
    "dishType": "one-dish",
    "subType": "seafood-pasta",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "200g spaghetti",
        "500g cooked mussels",
        "500g tomatoes, diced",
        "2 garlic cloves",
        "3 tbsp oil",
        "1 tbsp parsley, chopped",
        "Salt and black pepper, to taste"
      ],
      "steps": [
        "Saute garlic cloves in a frying pan with oil for about 1 minute until golden.",
        "Add diced tomatoes and cook over medium heat for 5 to 10 minutes. Set sauce aside.",
        "Add cooked mussels to the tomato sauce and cook on high heat for 5 minutes.",
        "Add chopped parsley, season with salt and pepper, and turn off heat.",
        "Cook spaghetti in a separate pot and drain.",
        "Add drained pasta to the pan with sauce and mix well over low heat for 1-2 minutes. Serve."
      ]
    }
  },
  {
    "id": "tom-yum-goong",
    "name": "Tom Yum Goong",
    "tags": [
      "asian",
      "seafood",
      "spicy",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "soup-tomyum",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "500ml water",
        "10 large prawns, deveined, head and tail left on",
        "70g canned straw mushrooms",
        "1 tbsp fish sauce, to taste",
        "Juice of 1 Thai lime, to taste",
        "Coriander, for garnish",
        "Spices (A): 30g instant tom yum paste, 4 shallots (peeled and sliced thinly), 1 lemongrass (pounded and sliced thinly), 2 kaffir lime leaves, 4 slices galangal, 1 chilli padi (sliced thinly), 2 dried red chillies"
      ],
      "steps": [
        "Boil water in a soup pot. Add Spices (A) and bring to a simmer.",
        "Add prawns and straw mushrooms. Once cooked, season with fish sauce and lime juice.",
        "Lower heat, stir in coconut milk, and warm through.",
        "Ladle into bowls and garnish with coriander."
      ]
    }
  },
  {
    "id": "chinese-spinach-macaroni-soup",
    "name": "Chinese Spinach Macaroni Soup",
    "tags": [
      "asian",
      "lunch-friendly",
      "dinner-friendly",
      "quick",
      "less-processed",
      "low-calories"
    ],
    "dishType": "one-dish",
    "subType": "macaroni",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "100g minced pork (or chicken)",
        "1 packet (200-250g) Chinese sharp/round spinach",
        "1 litre water",
        "2-3 servings macaroni, approx. 40g per person",
        "1 tsp salt",
        "1 chicken stock cube",
        "1 century egg, cubed",
        "1 tbsp wolfberries, soaked in water and drained",
        "Salt or light soy sauce, to taste",
        "Marinade (A): 1 tsp light soy sauce, 1/2 tsp fish sauce, 1 tsp sesame oil, 3 dashes white pepper powder, 1 tsp cornstarch"
      ],
      "steps": [
        "Marinate minced meat with Marinade (A) for at least 30 minutes in the fridge.",
        "Pluck spinach leaves, rinse, drain, and set aside.",
        "Boil water with 1 tsp salt, cook macaroni until al dente, drain, and divide into serving bowls.",
        "Boil 1 litre water with chicken stock cube in a soup pot, then reduce to a simmer. Shape marinated meat into small patties using two spoons and drop into boiling soup.",
        "Add spinach leaves and century egg; boil for 1 minute. Season with salt or light soy sauce if needed.",
        "Add wolfberries, turn off heat, and ladle soup over the macaroni."
      ]
    }
  },
  {
    "id": "gyudon-japanese-beef-rice-bowl",
    "name": "Gyudon (Japanese Beef Rice Bowl)",
    "tags": [
      "japanese",
      "quick",
      "less-processed",
      "asian"
    ],
    "dishType": "one-dish",
    "subType": "beef",
    "isRiceBased": true,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "1/2 onion (113g), thinly sliced",
        "1 green onion/scallion, diagonally sliced",
        "227g thinly sliced beef (chuck or ribeye)",
        "2 servings cooked Japanese short-grain rice",
        "Pickled red ginger (beni shoga), for garnish",
        "Sauce: 120ml dashi, 2 tbsp sake, 2 tbsp mirin, 3 tbsp soy sauce, 1 tbsp sugar"
      ],
      "steps": [
        "Cut semi-frozen beef into 3-inch wide pieces.",
        "In an unheated frying pan, combine dashi, sake, mirin, soy sauce, and sugar. Stir to dissolve sugar.",
        "Add onion slices, spreading them through the broth. Distribute beef slices on top of the onions.",
        "Cover and bring to heat over medium; once simmering, turn to low and simmer for 3-4 minutes. Skim off scum/fat as needed.",
        "Sprinkle green onions on top, cover, and cook for 1 more minute.",
        "Divide rice into bowls, drizzle pan sauce over rice, top with beef/onion mixture, and garnish with pickled red ginger."
      ]
    }
  },
  {
    "id": "healthy-clam-chowder",
    "name": "Healthy Clam Chowder (No Cream)",
    "tags": [
      "western",
      "seafood",
      "low-calories",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "soup-clam",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "500g fresh clams, cleaned",
        "1 medium potato, peeled and diced",
        "1 medium carrot, diced",
        "1 medium onion, chopped",
        "2 cloves garlic, minced",
        "2 slices bacon, chopped (optional)",
        "500ml chicken stock (or water)",
        "150ml low-fat milk",
        "1 tbsp olive oil",
        "Salt and pepper, to taste",
        "Fresh parsley, chopped, for garnish"
      ],
      "steps": [
        "Scrub and rinse clams thoroughly under running water.",
        "In a pot, heat olive oil over medium heat. Saute bacon (if using) until lightly crisp.",
        "Add onion and garlic; cook until fragrant.",
        "Stir in diced carrot and potato; cook for a few minutes.",
        "Pour in chicken stock, bring to a boil, then reduce heat and simmer for 10-15 minutes until vegetables are tender.",
        "Add clams and cover the pot. Cook until clams open (about 5 minutes).",
        "Pour in milk and stir gently (do not boil after adding milk).",
        "Season with salt and pepper to taste.",
        "Garnish with fresh parsley and serve hot."
      ]
    }
  },
  {
    "id": "chicken-lo-mein",
    "name": "Chicken Lo Mein",
    "tags": [
      "asian",
      "quick",
      "less-processed"
    ],
    "dishType": "one-dish",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "200g dry lo mein noodles (or Chinese egg noodles / spaghetti / angel hair)",
        "230g boneless chicken breast, sliced",
        "1 tsp cornstarch",
        "3 tbsp cooking oil",
        "3 cloves garlic, peeled and minced",
        "175g bok choy, sliced",
        "2 shiitake mushrooms, sliced",
        "1/3 cup carrots, peeled and sliced",
        "Sauce: 1 1/2 tbsp oyster sauce, 2 tbsp soy sauce, 1 tsp dark soy sauce, 1/2 cup chicken broth, 1/4 tsp sesame oil, 3 dashes white pepper, 1 tsp sugar (or to taste)"
      ],
      "steps": [
        "Cook lo mein noodles according to package instructions. Rinse with cold water, drain, and set aside.",
        "Marinate the sliced chicken with cornstarch and set aside.",
        "Combine all sauce ingredients in a small bowl and stir well.",
        "Heat cooking oil in a skillet over high heat. Saute garlic, then add chicken and stir-fry until the surface turns white.",
        "Add bok choy, mushrooms, and carrots; stir-fry to combine well.",
        "Pour in the sauce mixture and stir to coat the ingredients. Add the cooked lo mein noodles, tossing until evenly coated and heated through. Serve immediately."
      ]
    }
  },
  {
    "id": "chap-chye",
    "name": "Chap Chye (Mixed veg)",
    "tags": [
      "asian",
      "seafood",
      "low-calories",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "vegetable-mixed",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "3 cloves garlic, sliced",
        "1-inch piece ginger, sliced",
        "1 stalk Chinese leek, sliced",
        "100g Chinese cabbage, sliced",
        "100g cauliflower",
        "50g baby corn",
        "100g shiitake mushrooms",
        "6 black fungus, soaked for 20 minutes, hard parts removed, sliced",
        "50g snow peas",
        "12 prawns, shelled",
        "1 tbsp lower-sodium light soy sauce",
        "1 tbsp lower-sodium oyster sauce",
        "Dash of sesame oil",
        "1 tbsp canola oil",
        "Low-sodium salt, to taste",
        "1/4 cup water"
      ],
      "steps": [
        "Heat canola oil in a wok.",
        "Saute garlic and ginger, then add prawns and stir-fry.",
        "Add oyster sauce, light soy sauce, and sesame oil; stir-fry for 30 seconds.",
        "Add all the vegetables and water. Cook for 5 to 7 minutes on high heat, then season with salt to taste.",
        "Turn off heat and serve hot."
      ]
    }
  },
  {
    "id": "lemongrass-chicken",
    "name": "Lemongrass Chicken",
    "tags": [
      "asian",
      "dinner-friendly",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "1 stalk lemongrass, white part only",
        "350g skin-on boneless chicken thighs",
        "1 tbsp honey",
        "1/4 tsp salt",
        "3 dashes ground black pepper",
        "1/8 tsp cayenne pepper (optional)",
        "Cooking oil, for pan-frying"
      ],
      "steps": [
        "Grate the white part of the lemongrass finely using a Microplane (or chop finely).",
        "Marinate chicken with lemongrass, honey, salt, black pepper, and cayenne pepper (if using) for 10-15 minutes.",
        "Heat oil in a skillet over medium heat. Pan-fry chicken skin-side down first until browned, then flip and cook until the meat is browned, crispy, and fully cooked through.",
        "Finish by broiling in the oven for 1 minute to char the surface. Serve immediately with steamed rice."
      ]
    }
  },
  {
    "id": "pumpkin-with-enoki-mushroom-and-tofu",
    "name": "Pumpkin with Enoki Mushroom and Tofu",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice",
      "meatless",
      "low-calories",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "component",
    "subType": "tofu",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "2 Japanese tofu",
        "150g pumpkin",
        "150g broccoli, cut into pieces",
        "80g Enoki mushroom",
        "350ml water (or chicken broth)",
        "2 tbsp cooking oil",
        "Wanton skin, finely shredded and deep-fried",
        "1/4 tsp salt",
        "1/2 tsp caster sugar",
        "1 tsp chicken seasoning powder"
      ],
      "steps": [
        "Peel pumpkin and cut into pieces. Steam over high heat until cooked, then dish out and mash into a paste. Set aside.",
        "Cut each Japanese tofu into 4 pieces. Deep-fry in hot oil over high heat until browned, then drain and set aside.",
        "Blanch broccoli and Enoki mushrooms separately in boiling water over high heat. Drain and set aside.",
        "Arrange the mushrooms and fried tofu on a serving plate.",
        "Heat cooking oil in a wok over high heat. Add water (or broth), mashed pumpkin, and seasonings, stirring well. Bring to a boil, then turn off the heat.",
        "Pour the pumpkin mixture over the tofu, garnish with broccoli, and top with crispy wanton skin. Serve immediately."
      ]
    }
  },
  {
    "id": "honey-garlic-pork-chops",
    "name": "Honey Garlic Pork Chops",
    "tags": [
      "less-processed",
      "match-with-rice",
      "asian",
      "dinner-friendly",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "pork",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "4 pork chops (bone-in or boneless)",
        "Salt and pepper to season",
        "1 tsp garlic powder",
        "2 tbsp olive oil",
        "1 tbsp unsalted butter",
        "6 cloves garlic, minced",
        "1/4 cup honey",
        "1/4 cup water (or chicken broth)",
        "2 tbsp rice wine vinegar (or apple cider vinegar / white vinegar)"
      ],
      "steps": [
        "Preheat oven broiler (or grill) to medium-high heat. Season pork chops with salt, pepper, and garlic powder.",
        "Heat olive oil in a pan over medium-high heat. Sear chops until golden on each side and cooked through (about 4-5 minutes per side). Transfer to a plate and set aside.",
        "Reduce heat to medium. Melt butter in the same pan, scraping up any browned bits. Saute minced garlic until fragrant (about 30 seconds).",
        "Add honey, water (or broth), and vinegar. Increase heat to medium-high and simmer until sauce reduces and thickens slightly (about 3-4 minutes).",
        "Return pork chops to the pan, baste generously with the sauce, and broil/grill for 1-2 minutes until edges are slightly charred. Garnish with parsley and serve."
      ]
    }
  },
  {
    "id": "steamed-chicken-wingette-with-diced-taro-and-black-fungus",
    "name": "Steamed Chicken Wingette with Diced Taro and Black Fungus",
    "tags": [
      "asian",
      "less-processed",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "10 chicken wingettes",
        "1/2 tsp pepper",
        "1 tsp cornflour",
        "1 tsp light soy sauce",
        "1 tsp sesame oil",
        "1 tsp oyster sauce",
        "20g black fungus (presoaked and diced)",
        "30g young ginger, diced",
        "150g taro, diced",
        "20g wolfberries, soaked",
        "1 tsp oyster sauce",
        "1/4 tsp Sichuan peppercorns",
        "1/2 tbsp light soy sauce",
        "1/2 tsp sesame oil"
      ],
      "steps": [
        "Mix the pepper, cornflour, light soy sauce, sesame oil, and oyster sauce well with the chicken wingettes and marinate for 1 hour.",
        "Mix the black fungus, ginger, taro, and wolfberries with the seasonings (oyster sauce, Sichuan peppercorns, light soy sauce, sesame oil).",
        "Combine the marinated chicken wingettes with the taro and black fungus mixture.",
        "Pour into a steaming tray and steam in a preheated steamer for about 25 minutes until cooked through."
      ]
    }
  },
  {
    "id": "pan-fried-enoki-mushroom",
    "name": "Pan fried enoki mushroom",
    "tags": [
      "asian",
      "dinner-friendly",
      "low-calories",
      "less-processed",
      "lunch-friendly",
      "match-with-noodles",
      "match-with-rice",
      "meatless"
    ],
    "dishType": "component",
    "subType": "vegetable-mushroom",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "200 g enoki mushrooms fresh",
        "salt to taste",
        "1 tsp olive oil for coating",
        "2 tbsp potato flour / cornflour / tapioca flour",
        "1 tbsp oil for panfrying",
        "ground black pepper to taste",
        "sauce - 1 tbsp soy sauce; 1 tbsp unseasoned rice vinegar; ½ tbsp toasted sesame oil; 2 tbsp finely chopped green onions; ½ tbsp toasted white sesame seeds; 1 tsp  sugar;\t½ tsp freshly grated garlic"
      ],
      "steps": [
        "Mix sauce ingredients in a bowl.",
        "Cut off the root end of enoki mushrooms and gently rip them into bitesize bundles.",
        "Place them in a bowl and sprinkle with a few pinches of salt and 1 tsp olive oil. Toss until evenly covered.",
        "Sprinkle potato flour into the bowl and toss again until thoroughly coated.",
        "Preheat a large pan over medium heat and add oil. Arrange the coated enoki in the pan in a single layer and press them with a spatula, alternating so they're evenly pressed",
        "Fry for 4-5 minutes or until brown and crispy on both sides. Press continuously for even cooking and maximum crispiness.",
        "Serve enoki mushroom with sauce"
      ]
    }
  },
  {
    "id": "fish-ball-with-vermicelli-soup",
    "name": "Fish ball with vermicelli soup",
    "tags": [
      "dinner-friendly",
      "lunch-friendly",
      "quick"
    ],
    "dishType": "component",
    "subType": "soup-seafood",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "braised-pork-with-beancurd-stick-and-hardboiled-egg",
    "name": "Braised pork with beancurd stick and hardboiled egg",
    "tags": [
      "asian",
      "dinner-friendly",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "pork",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "steamed-rice-paper-prawns",
    "name": "Steamed rice paper prawns",
    "tags": [
      "less-processed",
      "dinner-friendly",
      "low-calories",
      "match-with-rice",
      "match-with-noodles",
      "quick",
      "lunch-friendly",
      "asian"
    ],
    "dishType": "component",
    "subType": "seafood",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "Rice paper sheets",
        "Frozen prawns (deshelled)",
        "Chopped green onions / scallions",
        "Water (for dipping rice paper)",
        "Dipping sauce: Soy sauce, sesame seeds, sesame oil"
      ],
      "steps": [
        "Dip a sheet of rice paper in water.",
        "Place 2 prawns and chopped green onions in the middle.",
        "Fold and roll up the rice paper.",
        "Steam for 5 minutes.",
        "Drizzle with dipping sauce and green onions before serving."
      ]
    }
  },
  {
    "id": "beef-stew",
    "name": "Beef stew",
    "tags": [
      "western",
      "lunch-friendly",
      "dinner-friendly",
      "match-with-rice",
      "less-processed"
    ],
    "dishType": "component",
    "subType": "beef",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "vietnamese-beef-pho",
    "name": "Vietnamese beef pho",
    "tags": [
      "dinner-friendly",
      "lunch-friendly",
      "asian"
    ],
    "dishType": "one-dish",
    "subType": "hor-fun",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "Beef slices",
        "Beef balls",
        "Beansprouts",
        "Lime",
        "Beef pho stock cube"
      ]
    }
  },
  {
    "id": "fried-salmon-skin",
    "name": "Fried salmon skin",
    "tags": [
      "dinner-friendly",
      "match-with-rice",
      "match-with-noodles",
      "lunch-friendly"
    ],
    "dishType": "component",
    "subType": "salmon",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "watercress-pork-rib-soup",
    "name": "Watercress pork rib soup",
    "tags": [
      "asian",
      "dinner-friendly",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "soup-pork-rib",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "Watercress",
        "Red dates",
        "Goji berries",
        "Pork Ribs"
      ]
    }
  },
  {
    "id": "chicken-rice",
    "name": "Chicken Rice",
    "tags": [
      "dinner-friendly",
      "lunch-friendly",
      "asian"
    ],
    "dishType": "one-dish",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "4 chicken thighs",
        "salt and pepper , to season the chicken",
        "1 tbsp cooking oil",
        "4 clove garlic, minced",
        "1 tbsp ginger, minced",
        "1 ½ cup rice , uncooked",
        "2 cup chicken stock",
        "2 thin slices ginger",
        "½ tsp salt",
        "2 green onion",
        "Soy sauce mixture: sesame oil, soy sauce, chopped scallions"
      ],
      "steps": [
        "Pat chicken thigh dry with a paper towel, then season with salt and pepper.",
        "Heat 1 tbsp of cooking oil in a pot over medium heat. Add minced garlic and ginger, and sauté until fragrant. Then add rice and stir for 1 minute until glossy.",
        "Pour in chicken broth, ginger slices, and salt. Then add chicken (skin side up), and green onion to the pot. Turn to high heat and bring it to a boil.",
        "Once boiling, bring it down to a simmer and cover the pot with a lid. Simmer for 15 minutes or until the rice absorbs all the liquid and chicken is fully cooked.",
        "Turn off heat and let it sit covered for 10 minutes.",
        "To serve: slice the chicken, fluff the rice, and serve with soy sauce mixture"
      ]
    }
  },
  {
    "id": "steamed-chicken-breast",
    "name": "Steamed Chicken Breast",
    "tags": [
      "dinner-friendly",
      "low-calories",
      "lunch-friendly",
      "quick"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "meatball-spaghetti",
    "name": "Meatball Spaghetti",
    "tags": [
      "italian",
      "lunch-friendly",
      "dinner-friendly",
      "noodles",
      "quick"
    ],
    "dishType": "one-dish",
    "subType": "mushroom-pasta",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "egg-noodles-soup",
    "name": "Egg Noodles Soup",
    "tags": [
      "asian",
      "lunch-friendly",
      "dinner-friendly",
      "noodles",
      "quick"
    ],
    "dishType": "one-dish",
    "subType": "seafood-noodle",
    "isRiceBased": false,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "Yellow noodles / Egg noodles",
        "Fishballs",
        "Minced chicken",
        "Meatballs",
        "Straw / Button mushrooms",
        "Vegetables",
        "Topping: Spring onion, bawang goreng"
      ]
    }
  },
  {
    "id": "black-bean-sauce-chicken",
    "name": "Black Bean Sauce Chicken",
    "tags": [
      "lunch-friendly",
      "dinner-friendly",
      "quick",
      "asian"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "Black bean sauce",
        "Boneless Chicken",
        "Capsicum"
      ]
    }
  },
  {
    "id": "yakitori-chicken",
    "name": "Yakitori Chicken",
    "tags": [
      "quick",
      "lunch-friendly",
      "dinner-friendly",
      "japanese",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "braised-grouper-with-beancurd-puff",
    "name": "Braised Grouper with Beancurd Puff",
    "tags": [
      "dinner-friendly",
      "match-with-rice",
      "seafood",
      "asian"
    ],
    "dishType": "component",
    "subType": "fish",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "steamed-sotong",
    "name": "Steamed sotong",
    "tags": [
      "dinner-friendly",
      "lunch-friendly",
      "quick",
      "low-calories",
      "asian",
      "match-with-rice"
    ],
    "dishType": "component",
    "subType": "seafood",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "white-fungus-chicken-soup",
    "name": "White Fungus Chicken Soup",
    "tags": [
      "quick",
      "match-with-rice",
      "less-processed",
      "dinner-friendly",
      "lunch-friendly",
      "asian",
      "low-calories"
    ],
    "dishType": "component",
    "subType": "soup-fish",
    "isRiceBased": false,
    "isCarbohydrate": false
  },
  {
    "id": "oyakodon",
    "name": "Oyakodon",
    "tags": [
      "japanese",
      "asian",
      "quick",
      "less-processed",
      "lunch-friendly",
      "dinner-friendly"
    ],
    "dishType": "one-dish",
    "subType": "chicken",
    "isRiceBased": true,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "1 boneless chicken thigh, cut into bite-sized pieces",
        "3 fresh shiitake mushrooms, sliced thickly",
        "½ cup shredded onion",
        "10 g spring onion sections",
        "2 eggs, beaten",
        "2 bowls cooked rice",
        "Chopped spring onion, for garnish",
        "Marinade: ¼ tsp salt, ¼ tsp pepper, ½ tsp cooking wine",
        "Sauce: 2 tbsp mushroom-flavoured soy sauce, 1 tbsp mirin, dash of salt, 1 cup water"
      ],
      "steps": [
        "Marinate the chicken for 10 minutes.",
        "Slice the mushrooms and beat the eggs.",
        "Heat 1 tbsp oil and sauté the onion and spring onion until fragrant.",
        "Add the sauce and bring to a boil.",
        "Add the chicken and mushrooms and simmer for 2–3 minutes until cooked.",
        "Pour in the beaten eggs and switch off the heat when the eggs are almost set.",
        "Spoon over hot rice and garnish with chopped spring onion."
      ]
    }
  },
  {
    "id": "luncheon-meat-with-king-oyster-mushrooms",
    "name": "Luncheon meat with King Oyster Mushrooms",
    "tags": [
      "dinner-friendly",
      "asian",
      "lunch-friendly",
      "match-with-rice",
      "quick"
    ],
    "dishType": "component",
    "subType": "pork",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "1 can luncheon meat, sliced and halved",
        "3 king oyster mushrooms, sliced and halved",
        "3 red chillies, sliced diagonally",
        "5 cloves garlic, sliced",
        "5 slices ginger",
        "1 cup basil leaves",
        "2 tbsp sesame oil",
        "Seasoning: 30 ml light soy sauce, 30 ml rice wine, 1 tbsp sugar"
      ],
      "steps": [
        "Heat the sesame oil in a pan.",
        "Fry the luncheon meat until golden brown. Remove and set aside.",
        "Using the same pan, sauté the garlic and ginger until fragrant.",
        "Add the king oyster mushrooms and stir-fry until slightly softened.",
        "Add the seasoning and stir well.",
        "Return the luncheon meat to the pan and stir-fry until evenly coated.",
        "Add the basil leaves and chillies, then stir until the basil has wilted."
      ]
    }
  },
  {
    "id": "corn-chicken-patties",
    "name": "Corn Chicken Patties",
    "tags": [
      "dinner-friendly",
      "lunch-friendly",
      "less-processed",
      "quick",
      "match-with-rice",
      "match-with-noodles",
      "asian"
    ],
    "dishType": "component",
    "subType": "chicken",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "200 g minced chicken",
        "80 g canned corn kernels",
        "¼ onion, diced",
        "1 tbsp diced spring onion",
        "1 tsp corn flour",
        "1 egg white",
        "Seasoning: ¼ tsp sesame oil, ½ tsp pepper, 1 tbsp light soy sauce"
      ],
      "steps": [
        "Place all the ingredients and seasoning into a large bowl.",
        "Mix thoroughly until well combined.",
        "Marinate for 30 minutes.",
        "Wet your hands and shape the mixture into patties.",
        "Heat 2 tbsp oil in a frying pan.",
        "Fry the patties until golden brown on both sides and cooked through."
      ]
    }
  },
  {
    "id": "stir-fried-minced-pork-with-caixin",
    "name": "Stir fried Minced Pork with Caixin",
    "tags": [
      "dinner-friendly",
      "lunch-friendly",
      "quick",
      "match-with-rice",
      "asian"
    ],
    "dishType": "component",
    "subType": "pork",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "500 g minced pork",
        "5 dried Chinese mushrooms, soaked until softened and sliced",
        "80 g canned pickled lettuce, drained (reserve the pickling juice)",
        "5 shallots, sliced",
        "5 cloves garlic, minced",
        "600 ml water",
        "Seasoning: 10 tbsp reserved pickled lettuce juice, 1 tbsp thick soy sauce, 1 tbsp rock sugar, 3 tbsp rice wine, 1 tsp pepper, ½ tsp five-spice powder"
      ],
      "steps": [
        "Heat 2 tbsp oil in a pan and sauté the garlic and shallots until fragrant.",
        "Add the minced pork and stir-fry until it turns white.",
        "Add the mushrooms and continue stir-frying.",
        "Stir in the pickled lettuce and seasoning.",
        "Pour in the water and bring to a boil.",
        "Reduce to low heat, cover and simmer for about 1 hour."
      ]
    }
  },
  {
    "id": "stir-fried-diced-lotus-root",
    "name": "Stir-fried Diced Lotus Root",
    "tags": [
      "lunch-friendly",
      "dinner-friendly",
      "less-processed",
      "low-calories",
      "asian",
      "quick"
    ],
    "dishType": "component",
    "subType": "vegetable-mixed",
    "isRiceBased": false,
    "isCarbohydrate": false,
    "recipe": {
      "ingredients": [
        "200 g chicken meat, diced",
        "¼ carrot, diced",
        "½ lotus root, diced",
        "2 shiitake mushrooms, diced",
        "½ red capsicum, diced",
        "Marinade: ¼ tsp salt, 2 tsp corn flour",
        "Seasoning: 1 tbsp light soy sauce, ½ tsp sugar, ½ tsp pepper"
      ],
      "steps": [
        "Mix the chicken with the marinade and leave for 10 minutes.",
        "Heat 2 tbsp oil in a pan and stir-fry the chicken until nearly cooked.",
        "Add the mushrooms and cook until fragrant.",
        "Add the lotus root and carrot and continue stir-frying.",
        "Add the red capsicum.",
        "Pour in the seasoning and toss until everything is evenly coated."
      ]
    }
  },
  {
    "id": "mui-fan-with-eggs-and-prawn",
    "name": "Mui Fan with Eggs and Prawn",
    "tags": [
      "asian",
      "dinner-friendly",
      "lunch-friendly",
      "less-processed",
      "quick"
    ],
    "dishType": "one-dish",
    "subType": "hor-fun",
    "isRiceBased": true,
    "isCarbohydrate": true,
    "recipe": {
      "ingredients": [
        "80 g prawns",
        "2 eggs, beaten",
        "1 tbsp chopped spring onion",
        "1 tbsp peas",
        "1 cup water",
        "1½ bowls cooked rice",
        "Prawn Marinade: ¼ tsp salt, 1 tsp cornstarch",
        "Gravy: ½ tsp salt, 2 tsp cornstarch mixed with a little water"
      ],
      "steps": [
        "Rub the prawns with a little salt, rinse and pat dry.",
        "Marinate the prawns with the prawn marinade for about 10 minutes.",
        "Heat 1 tbsp oil in a pan and stir-fry the prawns until about 80% cooked. Remove and set aside.",
        "Briefly stir-fry the spring onion, then add the water and bring to a boil.",
        "Season with the salt.",
        "Return the prawns to the pan and add the peas.",
        "Stir in the cornstarch mixture to thicken the gravy.",
        "Drizzle ½ tbsp oil around the edge of the pan, then pour in the beaten eggs.",
        "Turn off the heat once the eggs are just set.",
        "Spoon the egg gravy over the cooked rice and serve."
      ]
    }
  }
];

// Coarse food-group lookup, derived from subType rather than stored per item —
// used by rules that need "a vegetable"/"a protein"/"a soup"/"a carb", not the
// exact sub-type identity (that's what subType itself is for).
const MP_SUBTYPE_GROUPS = {
  "chicken": "protein",
  "duck": "protein",
  "pork": "protein",
  "beef": "protein",
  "salmon": "other",
  "seabass": "protein",
  "fish": "protein",
  "octopus": "protein",
  "squid": "protein",
  "unagi": "protein",
  "sotong-balls": "protein",
  "ngoh-hiang": "protein",
  "vegetable-stirfry": "vegetable",
  "vegetable-broccoli": "vegetable",
  "vegetable-beansprouts": "vegetable",
  "vegetable-bittergourd": "vegetable",
  "vegetable-spinach": "vegetable",
  "vegetable-potato": "other",
  "vegetable-kangkong": "vegetable",
  "vegetable-cauliflower": "vegetable",
  "vegetable-brinjal": "vegetable",
  "vegetable-pumpkin": "vegetable",
  "vegetable-mushroom": "other",
  "soup-abc": "soup",
  "soup-pork-rib": "soup",
  "soup-chicken": "soup",
  "soup-seafood": "soup",
  "soup-miso": "soup",
  "soup-egg-drop": "soup",
  "soup-tofu": "soup",
  "soup-fish": "soup",
  "soup-cauliflower": "soup",
  "rice-plain": "carb",
  "porridge": "carb",
  "mantou": "carb",
  "bread": "carb",
  "sweet-potato": "carb",
  "kuay-teow": "carb",
  "hor-fun": "carb",
  "udon": "carb",
  "macaroni": "carb",
  "seafood-pancake": "carb",
  "seafood-breaded": "carb",
  "kimchi-pancake": "carb",
  "gimbap": "carb",
  "mee-goreng": "carb",
  "seafood-noodle": "carb",
  "vegetarian-pasta": "carb",
  "vegetarian-noodle": "carb",
  "cheese-pasta": "carb",
  "seafood-pasta": "carb",
  "curry": "carb",
  "budae-jjigae": "carb",
  "toast-pizza": "carb",
  "yong-tau-foo": "carb",
  "mushroom-pasta": "carb",
  "soup-tomyum": "soup",
  "soup-clam": "soup",
  "vegetable-mixed": "vegetable",
  "salad": "other",
  "tofu": "other",
  "egg": "other",
  "peanuts": "other",
  "seafood": "protein",
  "hotpot": "other"
};

// `groups` defaults to the page's loaded MP_SUBTYPE_GROUPS, but accepts an
// override — admin.js passes its in-memory draft (mpAdminGroups) so the
// admin list reflects unsaved subType/group edits immediately, instead of
// the stale mapping baked into whatever data.js the page loaded with.
function getDishGroup(subType, groups = MP_SUBTYPE_GROUPS) {
  return groups[subType] || "other";
}

// Broad browsing categories shared by library.js's grid and picker.js's "add
// a dish" modal — distinct from MP_SUBTYPE_GROUPS/getDishGroup() above (that
// one's a rule-engine concept: protein/vegetable/soup/carb/other). Every
// item lands in exactly one category, decided by this priority order (first
// match wins): one-dish meal, soup, poultry, other meat, seafood,
// vegetarian-or-almost, others. "Vegetarian (or almost)" deliberately
// catches vegetable/mushroom/tofu/egg dishes even when they aren't strictly
// meat-free (e.g. a little chicken stock or oyster sauce) — the household
// doesn't track strict vegetarian purity, so subType/tags are used as a
// practical proxy rather than a literal vegetarian-tag check.
const MP_LIBRARY_CATEGORIES = [
  { key: "one-dish", label: "One-Dish Meals" },
  { key: "soup", label: "Soups" },
  { key: "poultry", label: "Poultry" },
  { key: "other-meat", label: "Other Meat (Beef/Pork)" },
  { key: "seafood", label: "Seafood" },
  { key: "vegetarian", label: "Vegetarian (or almost)" },
  { key: "others", label: "Others" }
];

function getLibraryCategory(item, groups = MP_SUBTYPE_GROUPS) {
  if (item.dishType === "one-dish") return "one-dish";
  if (getDishGroup(item.subType, groups) === "soup") return "soup";
  if (item.subType === "chicken" || item.subType === "duck") return "poultry";
  if (item.subType === "beef" || item.subType === "pork") return "other-meat";
  if (item.tags.includes("seafood")) return "seafood";
  if (
    getDishGroup(item.subType, groups) === "vegetable" ||
    item.subType === "tofu" ||
    item.subType === "egg" ||
    item.tags.includes("meatless")
  ) {
    return "vegetarian";
  }
  return "others";
}

// Groups `items` (already filtered by the caller) into MP_LIBRARY_CATEGORIES
// order, omitting any category with no matches. Shared by library.js's grid,
// picker.js's "add a dish" modal, and admin.js's item list (which passes its
// own draft `groups` — see getDishGroup() above) so all three stay in sync.
function groupByLibraryCategory(items, groups = MP_SUBTYPE_GROUPS) {
  return MP_LIBRARY_CATEGORIES
    .map(category => ({ category, items: items.filter(item => getLibraryCategory(item, groups) === category.key) }))
    .filter(group => group.items.length > 0);
}

// Returns the sorted list of distinct tags across all items.
function getAllTags(items) {
  const tagSet = new Set();
  items.forEach(item => item.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

function getItemById(items, id) {
  return items.find(item => item.id === id) || null;
}

// AND semantics across tagFilters; excludeTags removes any item that has at
// least one of them; searchText matches name substring (case-insensitive).
function filterItems(items, { searchText = "", tagFilters = [], excludeTags = [] } = {}) {
  const needle = searchText.trim().toLowerCase();
  return items.filter(item => {
    const matchesSearch = !needle || item.name.toLowerCase().includes(needle);
    const matchesTags = tagFilters.every(tag => item.tags.includes(tag));
    const matchesExclude = !excludeTags.some(tag => item.tags.includes(tag));
    return matchesSearch && matchesTags && matchesExclude;
  });
}

// Menu item images are resolved purely by convention — images/<id>.png —
// there is no per-item image field to maintain. Drop a file named after the
// item's id into images/ and it's picked up automatically everywhere a
// thumbnail is shown; GitHub Pages serves case-sensitively, so the filename
// must match the id (lowercase, hyphenated) exactly, and only .png is checked.
function getItemImagePath(item) {
  return `images/${item.id}.png`;
}

// Renders an item's thumbnail into `container`: an <img> pointed at its
// convention-based image path, or a plate-emoji placeholder if that image
// fails to load (typically because it doesn't exist).
function renderItemThumb(container, item) {
  container.innerHTML = "";
  const img = document.createElement("img");
  img.alt = "";
  img.onerror = () => {
    container.textContent = "🍽️";
  };
  img.src = getItemImagePath(item);
  container.appendChild(img);
}
