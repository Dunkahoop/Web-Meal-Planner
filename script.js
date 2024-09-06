// Load recipes and ingredients from local storage or use default recipes
var recipes = JSON.parse(localStorage.getItem("recipes")) || {};
var ingredients = JSON.parse(localStorage.getItem("ingredients")) || {};
var groceryList = JSON.parse(sessionStorage.getItem("groceryList")) || {};

// Get select element
var select = document.getElementById("options");
var ingreList = document.getElementById("ingredientList");

var totalItems = 0;//used as counter to stop program when no more items in grocery list

var dayList = [
  ["meal1", "web1"],
  ["meal2", "web2"],
  ["meal3", "web3"],
  ["meal4", "web4"],
  ["meal5", "web5"],
  ["meal6", "web6"],
  ["meal7", "web7"],
];

updateOptions();

function updateOptions() {
  // Clear existing options in the dropdowns
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  while (ingreList.firstChild) {
    ingreList.removeChild(ingreList.firstChild);
  }

  // Populate select element with keys of JSON object
  for (var key in recipes) {
    var option = document.createElement("option");
    option.text = key;
    select.add(option);
  }

  for (var key in ingredients) {
    var option = document.createElement("option");
    option.text = key;
    ingreList.add(option);
  }
}

function addRecipe() {
  // Get input values
  var key = document.getElementById("key").value;
  var value = document.getElementById("value").value;

  // Add new recipes
  if (key && value) recipes[key] = { name: key, website: value, ingredients: [] };

  // Save recipes to local storage
  localStorage.setItem("recipes", JSON.stringify(recipes));

  // Update paragraph
  document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2);

  document.getElementById("key").value = "";
  document.getElementById("value").value = "";

  updateOptions();
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
  var options = document.getElementById("options");
  var ingredient = document.getElementById("ingredient").value;
  var quantity = document.getElementById("quantity").value;

  // Add new recipes
  if (ingredient && quantity)
    //ensure recipes is actually in box
    recipes[options.value].ingredients.push({
      name: ingredient,
      quantity: quantity,
    });

  if (!ingredients[ingredient]) ingredients[ingredient] = ingredient;

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

function addToList() {
  var ingredient = document.getElementById("ingredientList");
  var quantity = document.getElementById("listQuantity").value;

  totalItems += quantity;

  groceryList[ingredient.value] = { quantity: quantity };

  sessionStorage.setItem("groceryList", JSON.stringify(groceryList, null, 2));

  document.getElementById("listQuantity").value = "";
}

//TODO: get this working!
function genMealPlan() {
  //TODO: add loop that either runs 7 times or through dayList

  //selects key of random recipe
  //https://stackoverflow.com/questions/30061969/select-random-object-from-json
  var obj_keys = Object.keys(recipes);
  var rand_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];
  

  document.getElementById("meal1").innerHTML = recipes[rand_key].name;
  document.getElementById("web1").innerHTML = "<a href=" + recipes[rand_key].website + " target=\"_blank\">Website</a>";
}


// Initial display of recipes
document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2);
document.getElementById("ingredients").innerHTML = JSON.stringify(
  ingredients,
  null,
  2
);