//TODO: add more warnings for incorrect input, pop up warnings

//TODO: scrap ingredient cookie? or just reduce it to names

//const version = 1.0;//TODO: this will be used for updating, helping to clean out old cookies that can't be used in new versions

//Clear session storage
window.onbeforeunload = function () {
  sessionStorage.clear();
};

// Load recipes and ingredients from local storage or use default recipes
let recipes = {};
let ingredients = {};//delete?
let groceryList = {}; //sessionStorage.setItem("groceryList", JSON.stringify(groceryList));

//JSON.parse(localStorage.getItem("recipes"))
//JSON.parse(localStorage.getItem("ingredients"))
//JSON.parse(sessionStorage.getItem("groceryList"))

if("recipes" in localStorage) recipes = JSON.parse(localStorage.getItem("recipes"));
else localStorage.setItem("recipes", JSON.stringify(recipes));

if("ingredients" in localStorage) ingredients = JSON.parse(localStorage.getItem("ingredients"));
else localStorage.setItem("ingredients", JSON.stringify(ingredients));

//for debug purposes
if("groceryList" in localStorage) groceryList = JSON.parse(localStorage.getItem("groceryList"));
else localStorage.setItem("groceryList", JSON.stringify(groceryList));

//if("groceryList" in sessionStorage) groceryList = JSON.parse(sessionStorage.getItem("groceryList"));

//if (recipes === undefined) localStorage.setItem("recipes", JSON.stringify(recipes));
//if (ingredients === undefined) localStorage.setItem("ingredients", JSON.stringify(ingredients));
//if (groceryList === undefined) 

// Get select element
var select = document.getElementById("recipeList");
var ingreList = document.getElementById("ingredientList");

//var totalItems = 0; //used as counter to stop program when no more items in grocery list
let totalItems = 14; //for testing purposes

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

function toggleElements() {
  const form = document.getElementById("toggleForm");
  const selectedOption = form.elements["toggle"].value;

  const elements = {
    //recipeSelect: document.getElementById('recipeSelect'),
    //ingredientSelect: document.getElementById('ingredientSelect'),
    addRecipe: document.getElementById("addRecipe"),
    deleteRecipe: document.getElementById("deleteRecipe"),
    deleteIngredient: document.getElementById("deleteIngredient"),
    addList: document.getElementById("addList"),
    addIngredient: document.getElementById("addIngredient"),
  };

  for (const key in elements) {
    if (elements.hasOwnProperty(key)) {
      elements[key].classList.toggle("hidden", key !== selectedOption);
    }
  }
}

function updateOptions(
  selectValue = null,
  ingreListValue = null,
  recipeSelectName = "recipeList",
  ingredientSelectName = "ingredientList"
) {
  //latter two args specify what element is to be selected initially by the dropdown, allows for ease of use
  const recipeSelectElements = document.querySelectorAll(
    `select[name="${recipeSelectName}"]`
  );
  const ingredientSelectElements = document.querySelectorAll(
    `select[name="${ingredientSelectName}"]`
  );

  // Clear existing options in all recipe select elements
  recipeSelectElements.forEach((select) => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });

  // Clear existing options in all ingredient select elements
  ingredientSelectElements.forEach((select) => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });

  // Populate recipe select elements with keys of recipes JSON object
  recipeSelectElements.forEach((select) => {
    for (const key in recipes) {
      const option = document.createElement("option");
      option.text = key;
      select.add(option);
    }
  });

  // Populate ingredient select elements with keys of ingredients JSON object
  ingredientSelectElements.forEach((select) => {
    for (const key in ingredients) {
      const option = document.createElement("option");
      option.text = key;
      select.add(option);
    }
  });

  // Set the value back to the initial value or the top value if it didn't have an initial value
  recipeSelectElements.forEach((select) => {
    select.value = selectValue || select.options[0].value;
  });

  ingredientSelectElements.forEach((select) => {
    select.value = ingreListValue || select.options[0].value;
  });

  // Update paragraph
  document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2);
  document.getElementById("ingredients").innerHTML = JSON.stringify(
    ingredients,
    null,
    2
  );
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
  var recipeList = document.getElementById("recipeList");
  var badRecipe = recipeList.value;
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
  //TODO: make a function that allows user to change the unit of measurement for an ingredient, and edit ingredients in a recipe
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

  var recipeList = document.getElementById("recipeList");
  var ingredient = document.getElementById("ingredient").value;
  var quantity = document.getElementById("quantity").value;
  var unit = unitForm.elements["unit"].value;

  let quantityNum = parseFloat(quantity);

  // Add new recipes
  if (ingredient && quantity)
    //ensure recipes is actually in box
    recipes[recipeList.value].ingredients.push({
      name: ingredient,
      quantity: quantityNum,
      unit: unit,
    });

  //TODO: ensure user can't add numbers as ingredient name
  if (!ingredients[ingredient])
    ingredients[ingredient] = {
      name: ingredient,
      unit: unit,
    };

  console.log(ingredients[ingredient]);

  //TODO:
  //-keep initial selection in dropdown when adding ingredient
  //-reset radio buttons after adding ingredient

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

  updateOptions(recipeList.value);
}

function getQuantity(amount = 0, unit = null) {
  //this is supposed to boil down the quantity of an ingredient based on the unit specified
  //use a switch statement
  //based on unit, we will know if it's solid or liquid
  //convert solids to grams, liquids to mililiters
  //do this for inputting groceries into list, and for deducting correct amount when making meal plan
  let quantity;

  switch (unit) {
    //we boil the ingredients down to these units, so no conversion needed
    case "indiv":
    case "grams":
    case "milliliters":
      quantity = amount;
      break;
    case "ounces":
      quantity = amount * 28.3495231;
      break;
    case "pounds":
      quantity = amount * 453.59237;
      break;
    //same conversion method for both
    case "kilograms":
    case "liters":
      quantity = amount * 1000;
      break;
    case "gallons":
      quantity = amount * 3785.41178;
      break;
    case "fluid_ounces":
      quantity = amount * 29.5735295;
      break;
  }

  return quantity;
}

function addToList() {
  const storeUnitForm = document.getElementById("storeUnit");

  var ingredient = document.getElementById("ingredientList");
  var quantity = document.getElementById("listQuantity").value;
  var type = "";
  var storeUnit = storeUnitForm.elements["unit"].value;


  switch (storeUnit) {
    case "indiv":
      type = "indiv";
      break;
    case "grams":
    case "ounces":
    case "pounds":
    case "kilograms":
      type = "solid";
      break;
    case "milliliters":
    case "liters":
    case "gallons":
    case "fluid_ounces":
      type = "liquid";
      break;
  }

  let quantityNum = getQuantity(parseFloat(quantity), storeUnit);
  //totalItems in theory would be a combo of all mL, g, and indiv. units, and they will be deducted in matching units, so it should be accurate, need to keep an eye on this
  totalItems += quantityNum;

  groceryList[ingredient.value] = { quantity: quantityNum, type: type };

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
    let broken = false; //ensures all ingredients are in grocery list

    //get random recipe
    //TODO:
    //-put this and other code in a while loop, runs until no more recipes left - done?
    //-tick off recipes when cannot be made -done?
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
        //totalItems -= ingredient.quantity; //deduct ingredient count from total count, needs to be calculated
        //todo: ensure deductions are made after all ingredients are verified
        //todo: convert cups/spoons to g/ml here
        var quantity = convertUnits(
          ingredient,
          groceryList[ingredient.name].type
        );
        if (quantity < groceryList[ingredient.name].quantity) groceryList[ingredient.name].quantity -= quantity;
        else {
          broken = true;
          break;
        }
      } else {
        //break loop if ingredient not in list or items run out
        console.log(ingredient.name + " is not in the grocery list. loop broken.");
        broken = true;
        break;
      }
    }

    //render meal for day with website link
    if (!broken) {
      console.log(currentRecipe.name + " can be made.");
      document.getElementById(mealId).innerHTML = recipes[rand_key].name;
      document.getElementById(webId).innerHTML =
        '<a href="' +
        recipes[rand_key].website +
        '" target="_blank">Website</a>';
    } else {
      console.log(currentRecipe.name + " cannot be made.");
      document.getElementById(mealId).innerHTML = "No meal possible.";
      document.getElementById(webId).innerHTML = "";
    }
  }
}

function convertUnits(ingredientRecipe = null, ingredientType = null) {
  let quantity;
  //TODO: figure this out
  if (ingredientType == "indiv") {
    quantity = ingredientRecipe.quantity;
  } else if (ingredientType == "liquid") {
    switch (ingredientRecipe.unit) {
      case "cups":
        quantity = ingredientRecipe.quantity * 236.588237;
        break;
      case "tablespoons":
        quantity = ingredientRecipe.quantity * 14.7867648;
        break;
      case "teaspoons":
        quantity = ingredientRecipe.quantity * 4.92892159;
        break;
    }
  } else {
    //solid
    //NOTE: conversions are approximate, easier to program given that ingredients are user-generated and trying to account for all would be near impossible
    switch (ingredientRecipe.unit) {
      case "cups":
        quantity = ingredientRecipe.quantity * 128;
        break;
      case "tablespoons":
        quantity = ingredientRecipe.quantity * 16;
        break;
      case "teaspoons":
        quantity = ingredientRecipe.quantity * 48;
        break;
    }
  }

  return quantity;
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
