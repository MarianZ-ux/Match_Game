
/***  appendNewCard(parentElement) <----- START HERE!
OVERVIEW:
This is the first function we're going to write in our project. The purpose of this function is to add a single new card element to the page (it won't have any pictures yet). We are going to "construct" this element and place it on the page using our knowledge of DOM Manipulation.
INPUT/OUTPUT: 
The appendNewCard function takes in a parent HTML element as a parameter named 'parentElement'. The parent element will look like this:
function appendNewCard(parentElement)
//After the function call the parentElement should look like this:
<div id="card-container">
    <div class="card"></div>
      <div class="card-down"></div>
      <div class="card-up"></div>
</div>
To accomplish this, the function is should create the new card element (i.e. .card), append it as a child to the parentElement (i.e. #card-container), and return the new card element.*/
function appendNewCard(parentElement) {
  // Step 1: Make a variable for the card element. Assign it to a new div element.
let cardElement = document.createElement("div");
  // Step 2: Add the "card" class to the card element.
cardElement.classList.add("card");
  // Step 3: Write the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of the card element.
cardElement.innerHTML = `
  '<div class="card-down"></div>'
  '<div class="card-up"></div>';`
  // Step 4: Append the card element to the parentElement, making the card element a "child".
parentElement.appendChild(cardElement);
  // Step 5: Return the card element.
  return cardElement;
}
appendNewCardTest();

/***  OVERVIEW:
We've defined image classes in the CSS named 'image-1' through 'image-6' that, when applied to a card, will make it show that particular image when it's flipped. Since the matching game works with pairs of images, we want to generate a random array with two of each image class string (12 total).
INPUT/OUTPUT: 
Returns an array with 12 randomly ordered image classes (i.e. image-X, where X is a value between 1 and 6). There should be exactly 2 of each image class in the array.*/

function shuffleCardImageClasses() {
  
  // Step 1: Initialize an array of 2 of each image class strings in-order (e.g. "image-1", "image-1", "image-2"...)
let imgArray = ["image-1", "image-1", "image-2","image-2",  "image-2", "image-3","image-3", "image-4", "image-4",     "image-5", "image-5", "image-6", "image-6"]
  /* Step 2: We're going to use a library to randomly "shuffle" the array we created. The library is called "underscore.js" because it uses an "_" charector as an object to contain helper methods.  Load underscore.js in your HTML via the CDN and then look at the "shuffle" method.  Note to ignore the "require" syntax as this is for non-browser environments (i.e. the var "_" will already be available to you from loading the CDN).
   
  CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
  Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm    */
   let shuffledArray = _.shuffle(imgArray);
  // Step 3: Return the shuffled array of class names.
  return shuffledArray;
}
 shuffleCardImageClassesTest();

/***  OVERVIEW:
For each of the 12 cards in the game, this function will create a card, assign it a random image class, and create an object to represent that card in our program.
INPUT/OUTPUT:  
The 'parentElement' parameter is the DOM element where the cards should be appended as children (i.e. #card-container). 
The 'shuffledImageClasses' parameter is an array of 12 image class strings (e.g. "image-1", "image-5", "image-3"...) randomly ordered and with 2 strings from each image class.
Returns an array of card objects to track all the cards for the rest of our program.*/
function createCards(parentElement, shuffledImageClasses) {
  // Step 1: Make an empty array to hold our card objects.
let cardArray = [];
  // Step 2: Loop 12 times to create the 12 cards we need.
for (let i = 0; i < 12; i++) {
// Step 2(a): create/append a new card = appendNewCard to   store the result in a variable.
 let newCard = appendNewCard(parentElement);
    
    // Step 2(b): new card element, Add an image class using shuffledImageClasses[i] 
newCard.classList.add(shuffledImageClasses[i]);
    /* Step 2(c): Create a new cardObject representing this. This should have properties for:
       "index" -- what iteration of the loop is this,
       "element" -- the dom element for the card,
       "imageClass" -- the string of the image class on the card.*/
let cardObject= {
  index:i,
  element: newCard,
  imageClass: shuffledImageClasses[i]};
    // Step 2(d): Append the new cardObject to the array of card objects.
  cardArray.push(newCard);
}
  // Step 3: Return the array of 12 card objects.
  return cardArray;
};
createCardsTest();


/***  doCardsMatch
OVERVIEW:
Given two card objects, this will check if the card objects show the same image when flipped.
INPUT/OUTPUT:  
the 1st card object in the comparison is 'cardObject1' parameter & the 2nd card object in the comparison is 'cardObject2' parameter
The function should return 'true' when both cards have the same imageClass property and 'false' otherwise.*/
function doCardsMatch(cardObject1, cardObject2) {
  if (cardObject1.imageClass == cardObject2.imageClass)
  { 
    return true;
  }
  else {return  false;
  }
}
doCardsMatchTest();

/* An object used below as a dictionary to store counter names and their respective values.  Do you remember using objects as dictionaries? If not, go back to that lecture to review. */
let counters = {};

/***  incrementCounter 
OVERVIEW:
Adds one to a counter being displayed on the webpage (meant for counting flips and matches).
INPUT/OUPUT
The 'counterName' parameter is the string representing the name of the counter to increment (e.g. "flip").
The 'parentElement' parameter is the DOM element that shows the counter (e.g. <span id="flip-count"> in the HTML). The 'innerHTML' of this element determines what value is displayed for the counter.
This function should use the global 'counters' object above to store counter names and their respective values and update the DOM to show the new counter value when changed.*/
function incrementCounter(counterName, parentElement) {
  // Step 1: If the 'counterName' property is not defined in the 'counters' object, add it with a value of 0.
  if (counters[counterName]==undefined){
    counters[counterName]=0;
  }
  // Step 2: Increment the counter for 'counterName'.
  counters[counterName]++;
  // Step 3: Change the DOM within 'parentElement' to display the new counter value.
parentElement.innerHTML = counters[counterName];
}
//incrementCounterTest();
/* Variables storing an audio objects to make the various sounds.  See how it's used for the 'click' sound in the provided function below.  */
let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav');

/***  flipCardWhenClicked
The implementation of this function has been provided for you but [you will still need to understand and call it.]
OVERVIEW:
Attaches a mouseclick listener to a card (i.e. onclick), flips the card when clicked, and calls the function 'onCardFlipped' after the flip is complete.
INPUT/OUPUT
The 'cardObject' parameter is a custom card object we created in the 'createCards' function.
This function will make the card element associated with 'cardObject' clickable and call onCardFlipped with that cardObject after the flip is complete.
        // THE CODE BELOW RUNS IN RESPONSE TO A CLICK.*/
function flipCardWhenClicked(cardObject) {
        // Adds an "onclick" attribute/listener to the element that will call the function below.
 cardObject.element.onclick = function() {
        // Card is already flipped, return.
  if (cardObject.element.classList.contains("flipped")) {
      return
        // Play the "click" sound.
    clickAudio.play()
        // Add the flipped class immediately after a card is clicked.
    cardObject.element.classList.add("flipped")
        // Wait 500 milliseconds (1/2 of a second) for the flip transition to complete and then call onCardFlipped.
    setTimeout(function() {
          // THE CODE BELOW RUNS AFTER a 500ms delay.
      onCardFlipped(cardObject)
    }, 500);
  }
 }
  //fixed it!
 
          /* The 'onCardFlipped' function below will be called each time the user flips a card.  This variable is used to remember the first card flipped while we wait for the user to flip another card. It should be reset to 'null' each time a second card is flipped. */

 /********i have no idea why line 155 is wrong & when i // it out then line 156 syntax err

        /*flipCardWhenClicked
        OVERVIEW:
        This is called each time the user flips a card and should handle and track the game mechanics like: "Is this the first or second card flipped in a sequence?", "Do the cards match", and "Is the game over?"
        INPUT/OUPUT
        The 'newlyFlippedCard' parameter is a custom card object that has just been flipped.*/
function onCardFlipped(newlyFlippedCard) {
        // Step 1: Add one to the flip counter UI.
 incrementCounter("flips", document.getElementById("flip-count"));
 let lastCardFlipped = {null

        //let newlyCardFlipped = null;
        // Step 2: If this is the first card flipped, then remember that card using the 'lastCardFlipped' variable and return (nothing else to do).
  if lastCardFlipped == null; {
     lastCardFlipped = newlyFlippedCard;return; }
        // Otherwise, we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard'.
        // Step 3: If the cards don't match, then remove the "flipped" class from each, reset 'lastCardFlipped', and return.
if (!doCardsMatch(lastCardFlipped,newlyFlippedCard) == true) {
  lastCardFlipped.element.classList.remove("flipped");
  newlyCardFlipped.element.classList.remove("flipped");
  lastCardFlipped = null;
  return;
}
 }
}
  // Otherwise, we have two matching cards.
  // Step 4: Increment the match counter and optionally add a "glow" effect to the matching cards.
else {
  incrementCounter("matches", document.getElementById("match-count"));
   lastCardFlipped.element.classList.add("glow");
   newlyCardFlipped.element.classList.add("glow");
}
        // Step 5: Play either the win audio or match audio based on whether the user has the number of matches needed to win.
if (document.getElementById("match-count").innerHTML == 6) {
  winAudio.play();
  else {
    matchAudio.play();
  
        // Step 6: Reset 'lastCardFlipped'.
  lastCardFlipped = null; 
  reset = (lastCardFlipped = null);
 }
}
      // Set up the game.
let cardObjects = 
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
}
runAllTests()