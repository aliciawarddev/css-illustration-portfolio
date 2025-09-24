// Array of burger objects, each containing a name and description
const burgerData = [
    ["The child molester", "(comes with candy)"],
    ["The final kraut-down", "(comes with sauerkraut)"],
    ["Bet it all on black garlic burger", "(comes with black garlic aioli)"],
    ["Foot feta-ish burger", "(comes with feta cheese)"], 
    ["Pepper don't preach burger", "(comed with"],
    ["Use it or blues it", "(comes with blue cheese)"],
    ["She's a super leek burger", "(comes with braised leeks)"],
    ["Olive and let fry burger", "(comes with olive tapenade)"],
    ["Don't go bacon my heart", "(comes with candied bacon)"],
    ["Onion ring around the rosie", "(comes with beer battered onion rings)"],
];

//Variable to keep track of which burger you're currently showing
let currentIndex = 0;

// Function that changes the burger text on the chalkboard 
function changeBurger() {
    // Move to the next burger in the array (% makes it loop back to 0 after the last item)
    currentIndex = (currentIndex + 1) % burgerData.length;
    
    //Find the html element with the class "name" and change its text
    document.querySelector('.name').textContent = burgerData[currentIndex][0];

    //Find the html element with class "description" and change its text
    document.querySelector('.description').textContent = burgerData[currentIndex][1];
}

// Wait for the page to fully load before setting up event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Find the button element and add a click event listener to it
  document.querySelector('.bell').addEventListener('click', changeBurger);
});