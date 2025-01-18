//TODO: add more warnings for incorrect input, pop up warnings

//Clear session storage
window.onbeforeunload = function () {
  sessionStorage.clear();
};

// Load recipes and ingredients from local storage or use default recipes
var recipes = JSON.parse(localStorage.getItem("recipes")) || {};
var ingredients = JSON.parse(localStorage.getItem("ingredients")) || {};
var groceryList = JSON.parse(sessionStorage.getItem("groceryList")) || {};

// Get select element
var select = document.getElementById("options");
var ingreList = document.getElementById("ingredientList");

var totalItems = 0; //used as counter to stop program when no more items in grocery list

const dayList = [
  ["meal1", "web1"],
  ["meal2", "web2"],
  ["meal3", "web3"],
  ["meal4", "web4"],
  ["meal5", "web5"],
  ["meal6", "web6"],
  ["meal7", "web7"],
];

updateOptions();

// function toggleElements() {
//   const form = document.getElementById("toggleForm");
//   const selectedOption = form.elements["toggle"].value;

//   const recipeSelect = document.getElementById('recipeSelect');
//   const ingredientSelect = document.getElementById('ingredientSelect');
//   const addRecipe = document.getElementById('addRecipe');
//   const deleteRecipe = document.getElementById('deleteRecipe');
//   const deleteIngredient = document.getElementById('deleteIngredient');
//   const addList = document.getElementById('addList');
//   const addIngredient = document.getElementById('addIngredient');

//   switch (selectedOption) {
//   case 'recipeSelect':
//   case 'ingredientSelect':
//   case 'addRecipe':
//   case 'deleteRecipe':
//   case 'deleteIngredient':
//   case 'addList':
//   case 'addIngredient':
//   }
// }

function toggleElements() {
  const form = document.getElementById("toggleForm");
  const selectedOption = form.elements["toggle"].value;

  const elements = {
      //recipeSelect: document.getElementById('recipeSelect'),
      //ingredientSelect: document.getElementById('ingredientSelect'),
      addRecipe: document.getElementById('addRecipe'),
      deleteRecipe: document.getElementById('deleteRecipe'),
      deleteIngredient: document.getElementById('deleteIngredient'),
      addList: document.getElementById('addList'),
      addIngredient: document.getElementById('addIngredient')
  };

  for (const key in elements) {
      if (elements.hasOwnProperty(key)) {
          elements[key].classList.toggle('hidden', key !== selectedOption);
      }
  }
}

function updateOptions(selectValue = null, ingreListValue = null) {
  const selectElements = document.querySelectorAll('select');

  // Clear existing options in all dropdowns
  selectElements.forEach(select => {
      while (select.firstChild) {
          select.removeChild(select.firstChild);
      }
  });

  // Populate select elements with keys of JSON object
  selectElements.forEach(select => {
      for (var key in recipes) {
          var option = document.createElement("option");
          option.text = key;
          select.add(option);
      }
  });

  // Set the value back to the initial value or the top value if it didn't have an initial value
  selectElements.forEach(select => {
      select.value = selectValue || select.options[select.options.length - 1].value;
  });

  // Populate ingreList element with keys of JSON object
  const ingreList = document.getElementById('ingredientList');
  while (ingreList.firstChild) {
      ingreList.removeChild(ingreList.firstChild);
  }
  for (var key in ingredients) {
      var option = document.createElement("option");
      option.text = key;
      ingreList.add(option);
  }
  ingreList.value = ingreListValue || ingreList.options[0].value;
}



// function updateOptions(selectValue = null, ingreListValue = null) {
//   // Store the initial values
//   //var initialSelectValue = select.value;
//   //var initialIngreListValue = ingreList.value;

//   // Clear existing options in the dropdowns
//   while (select.firstChild) {
//     select.removeChild(select.firstChild);
//   }

//   while (ingreList.firstChild) {
//     ingreList.removeChild(ingreList.firstChild);
//   }

//   // Populate select element with keys of JSON object
//   for (var key in recipes) {
//     var option = document.createElement("option");
//     option.text = key;
//     select.add(option);
//   }

//   for (var key in ingredients) {
//     var option = document.createElement("option");
//     option.text = key;
//     ingreList.add(option);
//   }

//   // Set the value back to the initial value or the top value if it didn't have an initial value
//   select.value = selectValue || select.options[select.options.length - 1].value;
//   ingreList.value = ingreListValue || ingreList.options[0].value;
// }

function addRecipe() {
  //TODO?: add number value for array?
  // Get input values
  var key = document.getElementById("key").value;
  var value = document.getElementById("value").value;

  // Add new recipes
  if (key && value && !recipes[key]) {
    recipes[key] = { name: key, website: value, ingredients: [] };

    // Save recipes to local storage
    localStorage.setItem("recipes", JSON.stringify(recipes));

    // Update paragraph
    document.getElementById("demo").innerHTML = JSON.stringify(
      recipes,
      null,
      2
    );

    document.getElementById("key").value = "";
    document.getElementById("value").value = "";

    updateOptions(key);
  }
}

function deleteRecipe() {
  var options = document.getElementById("options");
  var badRecipe = options.value;
  //localStorage.removeItem(badRecipe);
  delete recipes[badRecipe]; // Remove the recipe from the recipes object
  localStorage.setItem("recipes", JSON.stringify(recipes)); // Save the updated recipes
  document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2); // Update the display

  updateOptions();
}

function deleteIngredient() {
  var options = document.getElementById("ingredientList");
  var badIngre = options.value;
  //localStorage.removeItem(badRecipe);
  delete ingredients[badIngre]; // Remove the recipe from the recipes object
  localStorage.setItem("ingredients", JSON.stringify(ingredients)); // Save the updated recipes
  document.getElementById("ingredients").innerHTML = JSON.stringify(
    ingredients,
    null,
    2
  ); // Update the display

  updateOptions();
}

function addIngredient() {
  //TODO?: add number value for array?
  /* 
  Me:
  I'm at a loss here. I'm building an application that will automatically determine a meal plan for a week based on recipes added by the user, with the meal plan itself being determined by the user entering in foods they bought. 
  To account for the foods being used up, the app assigns a quantity to the ingredients purchased and deducts the amount needed for the recipe selected. 
  However, with all the different units of measurement used for the ingredients, I need to quantify it all into a number that can be decuted without having to deal with unit conversions, avoiding added complexity. 
  I've been struggling to approach this, especially with doing it in a way that won't confuse the user. Any ideas?

  Bing AI:
  I see where you're coming from. Dealing with different units of measurement can be a real headache. Here's an idea that might help simplify things:

  Standardize Units: Choose a single unit of measurement for each type of ingredient. For example, you could use grams for solids and milliliters for liquids. This way, you only need to convert the quantities once when the user inputs their grocery list.

  Conversion Table: Create a conversion table within your app that automatically converts common units to your standardized units. For example, if a recipe calls for 1 cup of flour, the app would convert that to grams based on your conversion table.

  User-Friendly Input: Allow users to input ingredients in their preferred units, but display the standardized units in the background. This way, users can continue to use familiar measurements without getting confused by the conversions.

  Ingredient Database: Maintain a database of common ingredients with their standardized quantities. When a user adds a recipe, the app can automatically pull the standardized quantities from the database.

  Visual Feedback: Provide visual feedback to users when they input ingredients. For example, if they enter "1 cup of flour," show them the equivalent in grams next to it. This helps users understand the conversion without feeling overwhelmed.

  Recipe Scaling: If a user wants to scale a recipe up or down, the app can use the standardized units to adjust the quantities accordingly. This ensures consistency and accuracy.

  By implementing these steps, you can simplify the process for users and avoid the complexity of dealing with multiple units of measurement. What do you think?
  */

  const unitForm = document.getElementById("units");

  var options = document.getElementById("options");
  var ingredient = document.getElementById("ingredient").value;
  var quantity = document.getElementById("quantity").value;
  var unit = unitForm.elements["unit"].value;

  // Add new recipes
  if (ingredient && quantity)
    //ensure recipes is actually in box
    recipes[options.value].ingredients.push({
      name: ingredient,
      quantity: quantity,
      unit: unit,
    });

  //TODO: ensure user can't add numbers as ingredient name
  if (!ingredients[ingredient])
    ingredients[ingredient] = {
      name: ingredient,
      unit: unit,
    };

  console.log(ingredients[ingredient]);

  // Save recipes and ingredients to local storage
  localStorage.setItem("recipes", JSON.stringify(recipes));
  localStorage.setItem("ingredients", JSON.stringify(ingredients));

  // Update paragraph
  document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2);
  document.getElementById("ingredients").innerHTML = JSON.stringify(
    ingredients,
    null,
    2
  );

  document.getElementById("ingredient").value = "";
  document.getElementById("quantity").value = "";

  updateOptions();
}

function getQuantity(amount = 0, unit = null) {
  //this is supposed to boil down the quantity of an ingredient based on the unit specified
  //use a switch statement
}

function addToList() {
  var ingredient = document.getElementById("ingredientList");
  var quantity = document.getElementById("listQuantity").value;

  totalItems += quantity;

  groceryList[ingredient.value] = { quantity: quantity };

  sessionStorage.setItem("groceryList", JSON.stringify(groceryList, null, 2));

  document.getElementById("listQuantity").value = "";

  document.getElementById("groceries").innerHTML = JSON.stringify(
    groceryList,
    null,
    2
  );
}

//TODO: ensure it goes through all recipes before calling it quits?
function genMealPlan() {
  if (totalItems === 0) return;

  //TODO: save what's left of grocery list, add boolean flag cookie to determine if it was used before
  //also change flag back first thing, so it occurs on refresh

  // Selects key of random recipe
  var obj_keys = Object.keys(recipes);

  // Iterate through the dayList array
  //random code from:
  //https://stackoverflow.com/questions/30061969/select-random-object-from-json
  for (var i = 0; i < dayList.length; i++) {
    let passed = false; //ensures all ingredients are in grocery list

    //get random recipe
    //TODO:
    //-put this and other code in a while loop, runs until no more recipes left
    //-tick off recipes when cannot be made
    var rand_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];

    //elements in 2d array for display
    var mealId = dayList[i][0];
    var webId = dayList[i][1];

    var currentRecipe = recipes[rand_key]; //reicpe randomly selected
    var ingredients = currentRecipe.ingredients; //ingredients in recipe
    for (var j = 0; j < ingredients.length; j++) {
      //look through all ingredients
      var ingredient = ingredients[j];
      if (groceryList[ingredient.name] && totalItems > 0) {
        //check if ingredient is in list and ensure list is not empty (may have entied from past days, may need to move up more)
        console.log(ingredient.name + " is in the grocery list.");
        totalItems -= ingredient.quantity; //deduct ingredient count from total count
        //todo: ensure deductions are made after all ingredients are verified
      } else {
        //break loop if ingredient not in list or items run out
        break;
      }

      passed = true;
    }

    //render meal for day with website link
    if (passed) {
      document.getElementById(mealId).innerHTML = recipes[rand_key].name;
      document.getElementById(webId).innerHTML =
        '<a href="' +
        recipes[rand_key].website +
        '" target="_blank">Website</a>';
    }
  }
}

// Initial display of recipes
document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2);
document.getElementById("ingredients").innerHTML = JSON.stringify(
  ingredients,
  null,
  2
);
document.getElementById("groceries").innerHTML = JSON.stringify(
  groceryList,
  null,
  2
);
