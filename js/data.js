// Master list of menu items. Hand-edited — add/remove items here directly.
// id must stay unique; image/recipe are optional (omit the key or set to null).
const MP_ITEMS = [
  {
    id: "pasta-primavera",
    name: "Pasta Primavera",
    tags: ["vegetarian", "pasta", "quick", "italian", "lunch-friendly", "dinner-friendly"],
    recipe: {
      ingredients: ["1 lb pasta", "2 cups mixed vegetables", "2 tbsp olive oil", "2 cloves garlic", "1/2 cup parmesan"],
      steps: ["Boil pasta until al dente.", "Sauté garlic and vegetables in olive oil.", "Toss pasta with vegetables and parmesan."]
    }
  },
  {
    id: "grilled-chicken-salad",
    name: "Grilled Chicken Salad",
    tags: ["chicken", "salad", "quick", "healthy", "lunch-friendly"],
    recipe: {
      ingredients: ["1 chicken breast", "4 cups mixed greens", "1/2 cup cherry tomatoes", "2 tbsp vinaigrette"],
      steps: ["Grill chicken and slice.", "Toss greens and tomatoes with vinaigrette.", "Top with sliced chicken."]
    }
  },
  {
    id: "beef-tacos",
    name: "Beef Tacos",
    tags: ["beef", "mexican", "spicy", "dinner-friendly"],
    recipe: {
      ingredients: ["1 lb ground beef", "8 small tortillas", "taco seasoning", "lettuce, cheese, salsa"],
      steps: ["Brown beef with taco seasoning.", "Warm tortillas.", "Assemble tacos with toppings."]
    }
  },
  {
    id: "veggie-stir-fry",
    name: "Veggie Stir Fry",
    tags: ["vegetarian", "vegan", "asian", "quick", "lunch-friendly", "dinner-friendly"],
    recipe: {
      ingredients: ["4 cups mixed vegetables", "2 tbsp soy sauce", "1 tbsp sesame oil", "1 tsp ginger", "cooked rice"],
      steps: ["Heat sesame oil in a wok.", "Stir-fry vegetables with ginger.", "Add soy sauce and serve over rice."]
    }
  },
  {
    id: "margherita-pizza",
    name: "Margherita Pizza",
    tags: ["vegetarian", "italian", "comfort-food", "dinner-friendly"]
  },
  {
    id: "lentil-soup",
    name: "Lentil Soup",
    tags: ["vegan", "soup", "comfort-food", "lunch-friendly"],
    recipe: {
      ingredients: ["1 cup red lentils", "1 onion", "2 carrots", "4 cups vegetable broth", "1 tsp cumin"],
      steps: ["Sauté onion and carrots.", "Add lentils, broth, and cumin.", "Simmer 25 minutes until lentils are soft."]
    }
  },
  {
    id: "shrimp-scampi",
    name: "Shrimp Scampi",
    tags: ["seafood", "pasta", "italian", "dinner-friendly"],
    recipe: {
      ingredients: ["1 lb shrimp", "8 oz linguine", "4 tbsp butter", "3 cloves garlic", "1/4 cup white wine"],
      steps: ["Cook linguine.", "Sauté garlic and shrimp in butter.", "Deglaze with wine and toss with pasta."]
    }
  },
  {
    id: "caprese-sandwich",
    name: "Caprese Sandwich",
    tags: ["vegetarian", "quick", "italian", "lunch-friendly"]
  },
  {
    id: "chicken-curry",
    name: "Chicken Curry",
    tags: ["chicken", "asian", "spicy", "comfort-food", "dinner-friendly"],
    recipe: {
      ingredients: ["1 lb chicken thighs", "1 can coconut milk", "2 tbsp curry paste", "1 onion", "cooked rice"],
      steps: ["Sauté onion and curry paste.", "Add chicken and coconut milk.", "Simmer 20 minutes and serve over rice."]
    }
  },
  {
    id: "greek-salad",
    name: "Greek Salad",
    tags: ["vegetarian", "salad", "mediterranean", "quick", "lunch-friendly"],
    recipe: {
      ingredients: ["cucumber", "tomato", "red onion", "feta cheese", "kalamata olives", "olive oil"],
      steps: ["Chop vegetables.", "Toss with olives and feta.", "Drizzle with olive oil."]
    }
  },
  {
    id: "beef-stir-fry",
    name: "Beef Stir Fry",
    tags: ["beef", "asian", "quick", "dinner-friendly"]
  },
  {
    id: "mushroom-risotto",
    name: "Mushroom Risotto",
    tags: ["vegetarian", "italian", "comfort-food", "dinner-friendly"],
    recipe: {
      ingredients: ["1.5 cups arborio rice", "8 oz mushrooms", "4 cups vegetable broth", "1/2 cup parmesan", "1/2 cup white wine"],
      steps: ["Sauté mushrooms and set aside.", "Toast rice, deglaze with wine.", "Add broth gradually, stirring, until creamy.", "Stir in mushrooms and parmesan."]
    }
  },
  {
    id: "turkey-club-sandwich",
    name: "Turkey Club Sandwich",
    tags: ["quick", "lunch-friendly"]
  },
  {
    id: "vegan-buddha-bowl",
    name: "Vegan Buddha Bowl",
    tags: ["vegan", "vegetarian", "healthy", "lunch-friendly", "dinner-friendly"],
    recipe: {
      ingredients: ["1 cup quinoa", "1 cup chickpeas", "roasted sweet potato", "kale", "tahini dressing"],
      steps: ["Cook quinoa.", "Roast sweet potato and chickpeas.", "Assemble bowl with kale and dressing."]
    }
  },
  {
    id: "fish-tacos",
    name: "Fish Tacos",
    tags: ["seafood", "mexican", "dinner-friendly"],
    recipe: {
      ingredients: ["1 lb white fish", "8 small tortillas", "cabbage slaw", "lime crema"],
      steps: ["Season and cook fish.", "Warm tortillas.", "Assemble with slaw and lime crema."]
    }
  },
  {
    id: "tomato-basil-soup",
    name: "Tomato Basil Soup",
    tags: ["vegetarian", "soup", "quick", "lunch-friendly"]
  },
  {
    id: "bbq-pulled-pork-sandwich",
    name: "BBQ Pulled Pork Sandwich",
    tags: ["pork", "comfort-food", "dinner-friendly"],
    recipe: {
      ingredients: ["2 lb pork shoulder", "1 cup BBQ sauce", "4 sandwich buns", "coleslaw"],
      steps: ["Slow-cook pork shoulder until tender.", "Shred and mix with BBQ sauce.", "Serve on buns with coleslaw."]
    }
  },
  {
    id: "falafel-wrap",
    name: "Falafel Wrap",
    tags: ["vegan", "vegetarian", "mediterranean", "quick", "lunch-friendly"],
    recipe: {
      ingredients: ["8 falafel balls", "2 flatbreads", "lettuce, tomato", "tahini sauce"],
      steps: ["Cook or heat falafel.", "Warm flatbreads.", "Assemble wraps with vegetables and tahini sauce."]
    }
  }
];

// Returns the sorted list of distinct tags across all items.
function getAllTags(items) {
  const tagSet = new Set();
  items.forEach(item => item.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

function getItemById(items, id) {
  return items.find(item => item.id === id) || null;
}

// AND semantics across tagFilters; searchText matches name substring (case-insensitive).
function filterItems(items, { searchText = "", tagFilters = [] } = {}) {
  const needle = searchText.trim().toLowerCase();
  return items.filter(item => {
    const matchesSearch = !needle || item.name.toLowerCase().includes(needle);
    const matchesTags = tagFilters.every(tag => item.tags.includes(tag));
    return matchesSearch && matchesTags;
  });
}
