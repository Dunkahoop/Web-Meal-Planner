// Load data from local storage or use default data
var data = JSON.parse(localStorage.getItem("recipes")) || {};

// Get select element
var select = document.getElementById("options");

// //clone dropdowns for other menus
// var clonedDropdown1 = select.cloneNode(true);
// var clonedDropdown2 = select.cloneNode(true);

// clonedDropdown1.value = select.value;
// clonedDropdown2.value = select.value;

//document.getElementById("options1").appendChild(clonedDropdown1);
//document.getElementById("options2").appendChild(clonedDropdown2)

// Populate select element with keys of JSON object
updateOptions();

function updateOptions() {
  // Clear existing options in the dropdown
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }

  // Populate select element with keys of JSON object
  for (var key in data) {
    var option = document.createElement("option");
    option.text = key;
    select.add(option);
    //clonedDropdown1.add(option);
    //clonedDropdown2.add(option);
  }
}

function addRecipe() {
  // Get input values
  var key = document.getElementById("key").value;
  var value = document.getElementById("value").value;

  // Add new data
  data[key] = value;

  // Save data to local storage
  localStorage.setItem("recipes", JSON.stringify(data));

  // Update paragraph
  document.getElementById("demo").innerHTML = JSON.stringify(
    data,
    null,
    2
  );

  document.getElementById("key").value = "";
  document.getElementById("value").value = "";

  // Clear existing options in the dropdown
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }

  // Populate select element with keys of JSON object
  for (var key in data) {
    var option = document.createElement("option");
    option.text = key;
    select.add(option);
  }
}

function deleteRecipe() {
  //var options = document.getElementById("options");
  var badRecipe = options.options[options.selectedIndex].text;
  //localStorage.removeItem(badRecipe);
  delete data[badRecipe]; // Remove the recipe from the data object
  localStorage.setItem("recipes", JSON.stringify(data)); // Save the updated data
  document.getElementById("demo").innerHTML = JSON.stringify(
    data,
    null,
    2
  ); // Update the display

  // Clear existing options in the dropdown
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }

  //update dropdown menu
  for (var key in data) {
    var option = document.createElement("option");
    option.text = key;
    select.add(option);
  }
}

// Initial display of data
document.getElementById("demo").innerHTML = JSON.stringify(data, null, 2);