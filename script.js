// Load recipes and ingredients from local storage or use default recipes
var recipes = JSON.parse(localStorage.getItem("recipes")) || {};
var ingredients = JSON.parse(localStorage.getItem("ingredients")) || {};
var groceryList = JSON.parse(localStorage.getItem("groceryList")) || {};

// Get select element
var select = document.getElementById("options");
var ingreList = document.getElementById("ingredientList");

updateOptions();

function updateOptions() {
  // Clear existing options in the dropdowns
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  while (ingreList.firstChild) {
    ingreList.removeChild(select.firstChild);
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
  if(key && value)
  recipes[key] = { website: value, ingredients: [] };

  // Save recipes to local storage
  localStorage.setItem("recipes", JSON.stringify(recipes));

  // Update paragraph
  document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2);

  document.getElementById("key").value = "";
  document.getElementById("value").value = "";

  updateOptions();

  // // Clear existing options in the dropdown
  // while (options.firstChild) {
  //   options.removeChild(options.firstChild);
  // }

  // // Populate select element with keys of JSON object
  // for (var key in recipes) {
  //   var option = document.createElement("option");
  //   option.text = key;
  //   select.add(option);
  // }
}

function deleteRecipe() {
  var options = document.getElementById("options");
  var badRecipe = options.value;
  //localStorage.removeItem(badRecipe);
  delete recipes[badRecipe]; // Remove the recipe from the recipes object
  localStorage.setItem("recipes", JSON.stringify(recipes)); // Save the updated recipes
  document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2); // Update the display

  updateOptions();

  // // Clear existing options in the dropdown
  // while (options.firstChild) {
  //   options.removeChild(options.firstChild);
  // }

  // //update dropdown menu
  // for (var key in recipes) {
  //   var option = document.createElement("option");
  //   option.text = key;
  //   select.add(option);
  // }
}

function addIngredient() {
  var options = document.getElementById("options");
  var ingredient = document.getElementById("ingredient").value;
  var quantity = document.getElementById("quantity").value;

  // Add new recipes
  if(ingredient) //ensure recipes is actually in box
  {recipes[options.value].ingredients.push({name: ingredient, quantity: quantity});
  ingredients[ingredient] = {quantity: quantity};}

  // Save recipes and ingredients to local storage
  localStorage.setItem("recipes", JSON.stringify(recipes));
  localStorage.setItem("ingredients", JSON.stringify(ingredients));

  // Update paragraph
  document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2);
  document.getElementById("ingredients").innerHTML = JSON.stringify(ingredients, null, 2);

  document.getElementById("ingredient").value = "";
  document.getElementById("quantity").value = "";

  updateOptions();
}

//TODO: add in this function; enable button in HTML file
// function addToList() {

// }

// Initial display of recipes
document.getElementById("demo").innerHTML = JSON.stringify(recipes, null, 2);
document.getElementById("ingredients").innerHTML = JSON.stringify(ingredients, null, 2);