// Load data from local storage or use default data
var data = JSON.parse(localStorage.getItem("recipes")) || {};

// Get select element
var select = document.getElementById("options");

updateOptions();

function updateOptions() {
  // Clear existing options in the dropdown
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  // Populate select element with keys of JSON object
  for (var key in data) {
    var option = document.createElement("option");
    option.text = key;
    select.add(option);
  }
}

function addRecipe() {
  // Get input values
  var key = document.getElementById("key").value;
  var value = document.getElementById("value").value;

  // Add new data
  if(key && value)
  data[key] = { website: value, ingredients: [] };

  // Save data to local storage
  localStorage.setItem("recipes", JSON.stringify(data));

  // Update paragraph
  document.getElementById("demo").innerHTML = JSON.stringify(data, null, 2);

  document.getElementById("key").value = "";
  document.getElementById("value").value = "";

  updateOptions();

  // // Clear existing options in the dropdown
  // while (options.firstChild) {
  //   options.removeChild(options.firstChild);
  // }

  // // Populate select element with keys of JSON object
  // for (var key in data) {
  //   var option = document.createElement("option");
  //   option.text = key;
  //   select.add(option);
  // }
}

function deleteRecipe() {
  var options = document.getElementById("options");
  var badRecipe = options.value;
  //localStorage.removeItem(badRecipe);
  delete data[badRecipe]; // Remove the recipe from the data object
  localStorage.setItem("recipes", JSON.stringify(data)); // Save the updated data
  document.getElementById("demo").innerHTML = JSON.stringify(data, null, 2); // Update the display

  updateOptions();

  // // Clear existing options in the dropdown
  // while (options.firstChild) {
  //   options.removeChild(options.firstChild);
  // }

  // //update dropdown menu
  // for (var key in data) {
  //   var option = document.createElement("option");
  //   option.text = key;
  //   select.add(option);
  // }
}

function addIngredient() {
  var options = document.getElementById("options");
  var ingredient = document.getElementById("ingredient").value;

  // Add new data
  if(ingredient) //ensure data is actually in box
  data[options.value].ingredients.push(ingredient);

  // Save data to local storage
  localStorage.setItem("recipes", JSON.stringify(data));

  // Update paragraph
  document.getElementById("demo").innerHTML = JSON.stringify(data, null, 2);

  document.getElementById("ingredient").value = "";

  updateOptions();
}

// Initial display of data
document.getElementById("demo").innerHTML = JSON.stringify(data, null, 2);
