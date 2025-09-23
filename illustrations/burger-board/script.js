// Array of burger objects, each containing a name and description
const burgerData = [
    {
        name: "Use it or blues it",
        description: "(comes with blue cheese"
    },
    {
        name: "She's a super leek burger",
        description: "(comes with braised leeks)"
    },
    {
        name: "The final kraut-down",
        description: "(comes with sauerkraut"
    },
    {
        name: "Poblano picasso burger",
        description: "(comes with poblano peppers)"
    },
    {
        name: "Bet it all on black garlic burger",
        description: "(comes with black garlic aioli)"
    },
    {
        name: "Olive and let fry burger",
        description: "(comes with olive tapenade"
    }
];

//Variable to keep track of which burger you're currently showing
let currentIndex = 0;

// Function that changes the burger text on the chalkboard 
function changeBurger() {
    // Move to the next burger in the array (% makes it loop back to 0 after the last item)
    currentIndex = (currentIndex + 1) %burgerData.length;
    
    //Find the html element with the class "name" and change its text
    document.querySelector('.name').textContent = burgerData[currentIndex].name;

    //Find the html element with class "description" and change its text
    document.querySelector('.description').textContent = burgerData[currentIndex].description;
}

// Wait for the page to fully load before setting up event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Find the button element and add a click event listener to it
  document.querySelector('.button').addEventListener('click', changeBurger);
});